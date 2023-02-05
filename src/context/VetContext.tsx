/* eslint-disable array-callback-return */
import { useRouter } from 'next/router'
import { createContext, ReactNode, useState } from 'react'
import { Service } from '../hooks/useClinicData'
import { setCookie } from 'nookies'
import { StaffDetailsType } from '../hooks/useStaffDetails'
import { api } from '../services/api'

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

  async function handleSetUser(token: string) {
    const response = await api.get('/api/staff/v1/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response.data

    const user = {
      id: data.id,
      avatarUrl: data.avatar_url,
      fullName: data.full_name,
      role: data.role,
    }

    setUser(user)
  }

  async function signIn({ email, password }: SignInCredentials) {
    const { data } = await api.post('/auth/signin', {
      username: email,
      password,
    })

    const { accessToken: token, refreshToken } = data
    const authenticated = data.authenticated

    if (authenticated) {
      setCookie(undefined, 'vet.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'vet.refreshToken', refreshToken)
      handleSetUser(token)
      router.push('/dashboard')
    }
  }

  return (
    <VetContext.Provider value={{ user, signIn }}>
      {children}
    </VetContext.Provider>
  )
}
