import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/api'
import { Patient, PatientRequest } from './useClinicData'

export type PatientServicesType = {
  patient: {
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
  service: {
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
  }
}

export async function getPatientsDetails(
  id: string,
): Promise<PatientServicesType[]> {
  const { data } = await api.get('/services/patient', {
    params: {
      id,
    },
  })

  const patientServices = data.map((data: any) => {
    return {
      patient: {
        id: data.patient.id,
        avatarUrl: data.patient.avatar_url,
        kind: data.patient.kind,
        birthDate: data.patient.birth_date,
        name: data.patient.name,
        owner: data.patient.owner,
        ownerContact: data.patient.owner_contact,
        breed: data.patient.breed,
      },
      staff: {
        id: data.staff.id,
        fullName: data.staff.full_name,
        role: data.staff.staffRole,
      },
      service: {
        id: data.id,
        created_at: data.created_at,
        status: data.status,
        type: data.type,
        city: data.city,
      },
    }
  })

  return patientServices
}

export function usePatientDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['patient', id], () => getPatientsDetails(id))
}
