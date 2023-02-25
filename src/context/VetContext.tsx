/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/apiClient'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

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

type VetContextData = {
  user: User | undefined
  servicesCategorized: any
  handleSetUser(user: User): void
  logout(): void
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function signOut() {
  destroyCookie(undefined, 'vet.token')
  destroyCookie(undefined, 'vet.refreshToken')
  Router.push('/login')
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<User | undefined>()

  const servicesCategorized = {
    exams: [],
    surgerys: [],
    emergencys: [],
    medicalCare: [],
  }

  function handleSetUser(user: User) {
    setUser(user)
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

          const user: User = {
            ...data,
            role: {
              code: data.role.id,
              ...data.role,
            },
          }

          setUser(user)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  function logout() {
    setUser(undefined)
    signOut()
  }

  return (
    <VetContext.Provider
      value={{
        user,
        servicesCategorized,
        logout,
        handleSetUser,
      }}
    >
      {children}
    </VetContext.Provider>
  )
}
