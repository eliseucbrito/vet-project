import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Patient } from '../utils/@types/patient'
import { Service, ServiceReq } from '../utils/@types/service'
import { patientMapper } from '../utils/mappers/patientMapper'

export type PatientServicesType = {
  patient: Patient
  services: Service[]
}

export async function getPatientsDetails(
  id: string,
): Promise<PatientServicesType> {
  const { data } = await api.get<ServiceReq[]>(`/api/services/v1`, {
    params: {
      'patient-id': id,
    },
  })

  const patient: Patient = {
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

  const ServicesArray: Service[] = data.map((data) => {
    return {
      description: data.description,
      id: data.id,
      createdAt: data.created_at,
      status: data.status,
      type: data.type,
      city: data.city,
      patient,
      staff: {
        id: data.staff.id,
        fullName: data.staff.full_name,
        role: data.staff.role,
        avatarUrl: data.staff.avatar_url,
      },
      price: data.price,
      serviceDate: data.service_date,
      title: data.title,
    }
  })

  const patientDetails = {
    patient,
    services: ServicesArray,
  }

  return patientDetails
}

export function usePatientDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['patient', id], () => getPatientsDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
