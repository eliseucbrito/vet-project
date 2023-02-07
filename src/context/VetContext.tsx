/* eslint-disable array-callback-return */
import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { Service } from '../hooks/useClinicData'
import { parseCookies, setCookie } from 'nookies'
import { StaffDetailsType } from '../hooks/useStaffDetails'
import { api } from '../services/api'
import { z } from 'zod'

export interface User {
  id: number
  avatarUrl: string
  fullName: string
  role: string
}

type SignInCredentials = {
  email: string
  password: string
}

type VetContextData = {
  user: User | undefined
  signIn(credentials: SignInCredentials): Promise<void>
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<User | undefined>()
  const router = useRouter()

  async function signIn({ email, password }: SignInCredentials) {
    const { data } = await api.post(
      '/auth/signin',
      {
        username: email,
        password,
      },
      {
        headers: {
          Authorization: '',
        },
      },
    )

    const { accessToken: token, refreshToken } = data
    const authenticated = data.authenticated

    api.defaults.headers.Authorization = `Bearer ${token}`

    if (authenticated) {
      setCookie(undefined, 'vet.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setCookie(undefined, 'vet.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      api
        .get('/api/staff/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data

          const user = {
            id: data.id,
            avatarUrl: data.avatar_url,
            fullName: data.full_name,
            role: data.role,
          }

          setUser(user)
          router.push('/dashboard')
        })
    }
  }

  useEffect(() => {
    const { 'vet.token': token } = parseCookies()

    if (token) {
      api
        .get('/api/staff/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data

          const user = {
            id: data.id,
            avatarUrl: data.avatar_url,
            fullName: data.full_name,
            role: data.role,
          }

          setUser(user)
          router.push('/dashboard')
        })
    }
  }, [])

  return (
    <VetContext.Provider value={{ user, signIn }}>
      {children}
    </VetContext.Provider>
  )
}
