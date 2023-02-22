/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Patient } from '../utils/@types/patient'
import { Service } from '../utils/@types/service'

export type PatientServicesType = {
  patient: Patient
  services: Service[]
}

export async function getPatients(): Promise<Patient[]> {
  const { data } = await api.get('/api/patients/v1')

  const patients = data.map((patient: Patient) => {
    return {
      ...patient,
    }
  })

  return patients
}

export async function getPatientsDetails(
  id: string,
): Promise<PatientServicesType> {
  const { data: patient } = await api.get(`/api/patients/v1/${id}`)
  const { data } = await api.get('/api/services/v1', {
    params: {
      'patient-id': id,
    },
  })

  const services: Service[] = []

  data.map((data: Service) => {
    services.push(data)
  })

  return {
    patient,
    services,
  }
}

export function usePatients(options?: UseQueryOptions) {
  return useQuery(['patients'], getPatients, {
    staleTime: 1000 * 60 * 60,
  })
}

export function usePatientDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['patient', id], () => getPatientsDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
