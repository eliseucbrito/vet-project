/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
import axios, { AxiosError, AxiosHeaders } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${cookies['vet.token']}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError<{ message: string }>) => {
    console.log('ERROR REQ', error)
    if (error.response?.status === 401) {
      if (error.response.data?.message === 'token.expired') {
        cookies = parseCookies()

        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .put('/auth/refresh', null, {
              headers: {
                Authorization: `Bearer ${cookies['vet.refreshToken']}`,
              },
            })
            .then((response) => {
              const { accessToken, refreshToken } = response.data
              console.log(response.data)

              setCookie(undefined, 'vet.token', accessToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })

              setCookie(undefined, 'vet.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })

              api.defaults.headers.Authorization = `Bearer ${accessToken}`

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(accessToken),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              ;(originalConfig.headers as AxiosHeaders).set(
                'Authorization',
                `Bearer ${token}`,
              )

              resolve(api(originalConfig!))
              // api.request(originalConfig!)
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        console.log('DESLOGAR')
      }
    }
  },
)
