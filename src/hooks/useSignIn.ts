/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { setCookie } from 'nookies'
import { api } from '../services/apiClient'

export interface User {
  id: number
  avatarUrl: string
  fullName: string
  onDuty: boolean
  role: {
    code: number
    description: string
  }
}

type SignInCredentials = {
  email: string
  password: string
  remember: boolean
}

export interface customError {
  status: number
  message: string
}

export async function getSignIn(
  credentials: SignInCredentials,
): Promise<User | customError> {
  const { email, password, remember } = credentials

  const response = await api.post(
    '/auth/signin',
    {
      username: email,
      password,
    },
    {
      headers: {
        // default in this moment is undefined
        Authorization: '',
      },
    },
  )

  const { accessToken: token, refreshToken } = response.data
  const { authenticated } = response.data

  api.defaults.headers.Authorization = `Bearer ${token}`

  if (authenticated) {
    // 30 days : 24h
    const maxAgeValue = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24
    setCookie(undefined, 'vet.token', token, {
      maxAge: maxAgeValue,
      path: '/',
    })

    setCookie(undefined, 'vet.refreshToken', refreshToken, {
      maxAge: maxAgeValue,
      path: '/',
    })

    const { data: userData } = await api.get('/api/staff/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = {
      ...userData,
      role: {
        code: userData.role.id,
        ...userData.role,
      },
    }

    return user
  } else {
    const error: customError = {
      status: response.status,
      message: response.data.message,
    }
    return error
  }
}

export function useSignIn(credentials: SignInCredentials) {
  return useQuery(['login'], () => getSignIn(credentials))
}
