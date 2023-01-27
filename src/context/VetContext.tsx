import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'

export interface Patient {
  id: number
  avatarUrl: string
  birthDate: string
  kind: string
  name: string
  owner: string
  ownerContact: string
  sity: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export interface StaffUser {
  id: number
  avatarUrl: string
  email: string
  password: string
  baseSalary: number
  createdAt: Date
  cpf: string
  fullName: string
  staffRole:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

export interface Service {
  id: number
  avatarUrl: string
  createdAt: string
  description: string
  price: number
  patient: Patient
  staff: StaffUser
  type: 'EXAM' | 'MEDICAL_CARE' | 'HOME_CARE' | 'SURGERY' | 'EMERGENCY'
  status:
    | 'NOT_INITIALIZED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SCHEDULED'
    | 'WAITING_PAYMENT'
    | 'PAID'
    | 'CANCELED'
}

interface User {
  firstName: string
  lastName: string
  role: string
  lvlAccess: number
  avatar?: string
  sex: string
  id: string
}

interface VetContextData {
  user: User
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<User>({
    firstName: 'Eliseu',
    lastName: 'Brito',
    role: 'Gerente',
    lvlAccess: 5,
    sex: 'm',
    avatar: 'https://github.com/eliseubrito7z.png',
    id: '1',
  })

  return <VetContext.Provider value={{ user }}>{children}</VetContext.Provider>
}
