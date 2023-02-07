import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { Patient, PatientRequest } from './useClinicData'

export async function getPatients(): Promise<Patient[]> {
  const { data } = await api.get('/api/patients/v1')

  const patients = data.map((patient: PatientRequest) => {
    return {
      id: patient.id,
      avatar_url: patient.avatar_url,
      kind: patient.kind,
      birth_date: patient.birth_date,
      name: patient.name,
      owner: patient.owner,
      owner_contact: patient.owner_contact,
      breed: patient.breed,
    }
  })

  return patients
}

export function usePatients() {
  return useQuery(['patients'], getPatients, {
    staleTime: 1000 * 60 * 60,
  })
}
