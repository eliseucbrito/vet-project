import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../services/api'

type Patient = {
  id: number
  avatar_url: string
  birth_date: string
  kind: string
  name: string
  owner: string
  owner_contact: string
  sity: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
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

type ServiceRequest = {
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

type Service = {
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

type ClinicData = {
  clients: {
    total: number
    today: number
  }
  staff: {
    total: number
    onDuty: number
  }
  rooms: {
    total: number
    available: number
  }
}

type GetServicesResponse = {
  total: number
  services: Service[]
}

export async function getClinicData(): Promise<ClinicData> {
  const { data: servicesData } = await api.get('/services')
  const { data: staffData } = await api.get('/staff-users')

  const services = servicesData.map((service: ServiceRequest) => {
    return {
      createdAt: service.created_at,
    }
  })

  let servicesTodayQnt = 0

  const servicesToday = await services.map((service: Service) => {
    const serviceDate = dayjs(new Date(service.createdAt))
    const isToday = serviceDate.get('date') === dayjs(new Date()).get('date')

    if (isToday) {
      return (servicesTodayQnt += 1)
    }
    return servicesTodayQnt
  })

  const clinicData: ClinicData = {
    clients: {
      total: services.length,
      today: servicesTodayQnt,
    },
    staff: {
      total: 0,
      onDuty: 0,
    },
    rooms: {
      total: 0,
      available: 0,
    },
  }

  return clinicData
}

export function useClinicData() {
  return useQuery(['clinicData'], getClinicData)
}
