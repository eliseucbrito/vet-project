import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Staff } from '../utils/@types/staff'

export async function getStaff(): Promise<Staff[]> {
  const { data } = await api.get<Staff[]>('/api/staff/v1')

  const staff = data.map((user) => {
    return {
      ...user,
    }
  })

  return staff
}

export function useStaff(options?: UseQueryOptions) {
  return useQuery(['staff'], getStaff, {
    staleTime: 1000 * 60 * 60,
  })
}
