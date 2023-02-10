/* eslint-disable array-callback-return */
import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { Service } from '../hooks/useClinicData'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { StaffDetailsType } from '../hooks/useStaffDetails'
import { api } from '../services/api'
import { z } from 'zod'
import { GetServerSideProps } from 'next'

export interface User {
  id: number
  avatarUrl: string
  fullName: string
  role: {
    code: number
    description: string
  }
}

type SignInCredentials = {
  email: string
  password: string
}

type VetContextData = {
  user: User | undefined
  servicesCategorized: any
  logout(): void
  signIn(credentials: SignInCredentials): Promise<void>
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<User | undefined>()
  const router = useRouter()

  const servicesCategorized = {
    exams: [],
    surgerys: [],
    emergencys: [],
    medicalCare: [],
  }

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
            role: {
              code: data.role.id,
              description: data.description,
            },
          }

          setUser(user)
        })
    }
  }, [])

  function logout() {
    destroyCookie(undefined, 'vet.token')
    setUser(undefined)
    router.push('/')
  }

  return (
    <VetContext.Provider value={{ user, signIn, servicesCategorized, logout }}>
      {children}
    </VetContext.Provider>
  )
}
