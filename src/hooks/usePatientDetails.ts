import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/api'
import { PatientRequest } from './useClinicData'

export type PatientDetails = {
  id: number
  avatarUrl: string
  birthDate: string
  kind: string
  name: string
  owner: string
  ownerContact: string
  breed: string
  createdAt: Date
}

export type ServiceDetails = {
  id: number
  createdAt: string
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
  staff: {
    id: number
    fullName: string
    role:
      | 'CEO'
      | 'GENERAL_MANAGER'
      | 'MANAGER'
      | 'VETERINARY'
      | 'ASSISTANT'
      | 'INTERN'
  }
}

export type PatientServicesType = {
  patient: PatientDetails
  services: ServiceDetails[]
}

export async function getPatientsDetails(
  id: string,
): Promise<PatientServicesType> {
  const { data } = await api.get(`/api/patients/v1/${id}/details`)

  const ServicesArray: ServiceDetails[] = data.map((data: any) => {
    return {
      id: data.id,
      created_at: data.created_at,
      status: data.status,
      type: data.type,
      city: data.city,
      staff: {
        id: data.staff.id,
        fullName: data.staff.full_name,
        role: data.staff.staffRole,
        email: data.staff.email,
      },
    }
  })

  const patient: PatientDetails = {
    id: data[0].patient.id,
    avatarUrl: data[0].patient.avatar_url,
    kind: data[0].patient.kind,
    birthDate: data[0].patient.birth_date,
    name: data[0].patient.name,
    owner: data[0].patient.owner,
    ownerContact: data[0].patient.owner_contact,
    breed: data[0].patient.breed,
    createdAt: data[0].patient.created_at,
  }

  const patientDetails = {
    patient,
    services: ServicesArray,
  }

  return patientDetails
}

export function usePatientDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['patient', id], () => getPatientsDetails(id))
}
