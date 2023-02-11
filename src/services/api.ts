/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
import axios, { AxiosError, AxiosHeaders } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../context/VetContext'

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
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
      if (error.response?.status === 401) {
        if (error.response.data?.message === 'token.expired') {
          cookies = parseCookies(ctx)

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

                setCookie(ctx, 'vet.token', accessToken, {
                  maxAge: 60 * 5, // 5 minutes
                  path: '/',
                })

                setCookie(ctx, 'vet.refreshToken', refreshToken, {
                  maxAge: 60 * 5, // 5 minutes
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

                if (typeof window !== 'undefined') {
                  signOut()
                }
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
          if (typeof window !== 'undefined') {
            signOut()
          }
        }

        return Promise.reject(error)
      }
    },
  )

  return api
}
