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

export async function getPatients(): Promise<Patient[]> {
  const { data } = await api.get('/patients')

  const patients = data.map((patient: Patient) => {
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
    staleTime: 1000 * 2,
  })
}
