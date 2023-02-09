import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { Staff, StaffRequest } from './useClinicData'

export async function getStaff(): Promise<Staff[]> {
  const { data } = await api.get('/api/staff/v1')

  const staff = data.map((user) => {
    return {
      id: user.id,
      avatarUrl: user.avatar_url,
      email: user.email,
      baseSalary: user.base_salary,
      createdAt: user.created_at,
      cpf: user.cpf,
      fullName: user.full_name,
      role: user.role,
      onDuty: user.on_duty,
    }
  })

  return staff
}

export function useStaff() {
  return useQuery(['staff'], getStaff, {
    staleTime: 1000 * 60 * 60,
  })
}
