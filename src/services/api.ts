/* eslint-disable no-undef */
/* eslint-disable n/handle-callback-err */
import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

const cookies = parseCookies()
const isRefreshing = false
// let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${cookies['vet.token']}`,
  },
})

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       if (error.response.data?.message === 'token.expired') {
//         cookies = parseCookies()

//         const originalConfig = error.config

//         if (!isRefreshing) {
//           isRefreshing = true

//           api
//             .put('/auth/refresh', null, {
//               headers: {
//                 Authorization: `Bearer ${cookies['vet.refreshToken']}`,
//               },
//             })
//             .then((response) => {
//               const { token, refreshToken } = response.data

//               setCookie(undefined, 'vet.token', token, {
//                 maxAge: 60 * 60 * 24 * 30, // 30 days
//                 path: '/',
//               })

//               setCookie(undefined, 'vet.refreshToken', refreshToken, {
//                 maxAge: 60 * 60 * 24 * 30, // 30 days
//                 path: '/',
//               })

//               api.defaults.headers.Authorization = `Bearer ${token}`

//               // failedRequestsQueue.forEach((request) => request.onSuccess(token))
//               // failedRequestsQueue = []
//             })
//           // .catch((err) => {
//           //   failedRequestsQueue.forEach((request) => request.onFailure(err))
//           //   failedRequestsQueue = []
//           // })
//           // .finally(() => {
//           //   isRefreshing = false
//           // })
//         }

//         // return new Promise((resolve, reject) => {
//         //   failedRequestsQueue.push({
//         //     onSuccess: (token: string) => {
//         //       originalConfig!.headers!.Authorization = `Bearer ${token}`

//         //       resolve(api(originalConfig!))
//         //     },
//         //     onFailure: (err: AxiosError) => {
//         //       reject(err)
//         //     },
//         //   })
//         // })
//       } else {
//         console.log('DESLOGAR')
//       }
//     }
//   },
// )
