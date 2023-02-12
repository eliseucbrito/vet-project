import { useQuery } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Patient, PatientReq } from '../utils/@types/patient'
import { patientMapper } from '../utils/mappers/patientMapper'

export async function getPatients(): Promise<Patient[]> {
  const { data } = await api.get('/api/patients/v1')

  const patients = data.map((patient: PatientReq) => {
    const patientConverted = patientMapper(patient)

    return patientConverted
  })

  return patients
}

export function usePatients() {
  return useQuery(['patients'], getPatients, {
    staleTime: 1000 * 60 * 60,
  })
}
