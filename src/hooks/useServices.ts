/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/api'
import { ServiceRequest } from './useClinicData'

type Patient = {
  id: number
  avatarUrl: string
  createdAt: string
  birthDate: string
  kind: string
  name: string
  owner: string
  ownerContact: string
  breed: string
}

type Service = {
  id: number
  createdAt: string
  serviceDate: string
  description: string
  title: string
  price: number
  patient: Patient
  staff: {
    id: number
    fullName: string
    avatarUrl: string
    role: {
      code: number
      description:
        | 'CEO'
        | 'GENERAL_MANAGER'
        | 'MANAGER'
        | 'VETERINARY'
        | 'ASSISTANT'
        | 'INTERN'
    }
  }
  type: 'EXAM' | 'MEDICAL_CARE' | 'HOME_CARE' | 'SURGERY' | 'EMERGENCY'
  status:
    | 'NOT_INITIALIZED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SCHEDULED'
    | 'WAITING_PAYMENT'
    | 'PAID'
    | 'CANCELED'
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type ServiceResponse = {
  servicesArray: Service[]
  service: Service | undefined
}

export async function getServices(id?: string): Promise<ServiceResponse> {
  const { data } = await api.get('/api/services/v1')

  const servicesArray: Array<Service> = []
  let serviceDetails: Service | undefined

  data.map((service) => {
    const services = {
      id: service.id,
      createdAt: service.created_at,
      serviceDate: service.service_date,
      patient: {
        id: service.patient.id,
        avatarUrl: service.patient.avatar_url,
        createdAt: service.patient.created_at,
        birthDate: service.patient.birth_date,
        kind: service.patient.kind,
        name: service.patient.name,
        owner: service.patient.owner,
        ownerContact: service.patient.owner_contact,
        breed: service.patient.breed,
      },
      price: service.price / 1000,
      title: service.title,
      description: service.description,
      staff: {
        id: service.staff.id,
        fullName: service.staff.full_name,
        avatarUrl: service.staff.avatar_url,
        role: {
          code: service.staff.role.id,
          description: service.staff.role.description,
        },
      },
      status: service.status,
      type: service.type,
      city: service.city,
    }

    if (id === undefined) {
      // if no id provided, return all services
      return servicesArray.push(services)
    }
    // if id provided, return the corresponding service
    if (id === String(service.id)) return (serviceDetails = services)
  })

  return {
    servicesArray,
    service: serviceDetails,
  }
}

export function useServices(id?: string, options?: UseQueryOptions) {
  return useQuery(['services', id], () => getServices(id), {
    staleTime: 1000 * 60 * 60,
  })
}
