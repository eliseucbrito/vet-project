import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'

export interface Patient {
  id: number
  avatar_url: string
  birth_date: string
  kind: string
  name: string
  owner: string
  owner_contact: string
  sity: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export interface StaffUser {
  id: number
  avatar_url: string
  email: string
  password: string
  base_salary: number
  created_at: Date
  cpf: string
  full_name: string
  staff_role:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

export interface Service {
  id: number
  avatar_url: string
  created_at: string
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
}

interface PatientsProps {
  id: string
  patientImage: string
  species: string
  owner: string
  phoneNumber: string
  city: string
  lastService: Date
  status: 'Not Initialized' | 'In Progress' | 'Completed'
}

interface ClinicData {
  clients: {
    total: number
    today: number
  }
  staff: {
    total: number
    in_work: number
  }
  rooms: {
    total: number
    available: number
  }
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
  })

  const [clinicData, setClinicData] = useState<ClinicData>()

  // const { data: services } = useQuery<Service[]>(['service'], async () => {
  //   const response = await api.get('/service')

  //   return response.data
  // })

  return <VetContext.Provider value={{ user }}>{children}</VetContext.Provider>
}
