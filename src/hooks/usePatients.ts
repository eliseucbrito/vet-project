import { useQuery } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Patient } from '../utils/@types/patient'

export async function getPatients(): Promise<Patient[]> {
  const { data } = await api.get('/api/patients/v1')

  const patients = data.map((patient: Patient) => {
    return {
      ...patient,
    }
  })

  return patients
}

export function usePatients() {
  return useQuery(['patients'], getPatients, {
    staleTime: 1000 * 60 * 60,
  })
}
