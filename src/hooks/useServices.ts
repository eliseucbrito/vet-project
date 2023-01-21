import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

type Patient = {
  id: number
  avatar_url: string
  birth_date: string
  kind: string
  name: string
  owner: string
  owner_contact: string
  breed: string
}

type StaffUser = {
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

type Service = {
  id: number
  avatar_url: string
  created_at: string
  description: string
  price: number
  patient: Patient
  staff: StaffUser
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
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

type GetServicesResponse = {
  total: number
  services: Service[]
}

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get('/api/services/v1')

  const services = data.map((service: Service) => {
    return {
      id: service.id,
      avatar_url: service.patient.avatar_url,
      created_at: service.created_at,
      patient: service.patient,
      price: service.price,
      description: service.description,
      staff: service.staff,
      status: service.status,
      type: service.type,
      city: service.city,
    }
  })

  return services
}

export function useServices() {
  return useQuery(['services'], getServices, {
    staleTime: 1000 * 2,
  })
}
