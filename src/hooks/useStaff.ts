import { useQuery } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Staff, StaffReq } from '../utils/@types/staff'
import { staffMapper } from '../utils/mappers/staffMapper'

export async function getStaff(): Promise<Staff[]> {
  const { data } = await api.get<StaffReq[]>('/api/staff/v1')

  const staff = data.map((user) => {
    const staff = staffMapper(user)

    return staff
  })

  return staff
}

export function useStaff() {
  return useQuery(['staff'], getStaff, {
    staleTime: 1000 * 60 * 60,
  })
}
