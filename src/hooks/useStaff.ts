import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

type StaffUserApi = {
  id: number
  avatar_url: string
  email: string
  password: string
  base_salary: number
  created_at: Date
  cpf: string
  full_name: string
  staffRole: string
}

type Staff = {
  id: number
  avatar_url: string
  email: string
  base_salary: number
  created_at: Date
  cpf: string
  full_name: string
  role: string
}

export async function getStaff(): Promise<Staff[]> {
  const { data } = await api.get('/staff-users')
  console.log('STAFF DATA', data)

  const staff = data.map((user: StaffUserApi) => {
    return {
      id: user.id,
      avatar_url: user.avatar_url,
      email: user.email,
      base_salary: user.base_salary,
      created_at: user.created_at,
      cpf: user.cpf,
      full_name: user.full_name,
      role: user.staffRole,
    }
  })

  return staff
}

export function useStaff() {
  return useQuery(['staff'], getStaff, {
    staleTime: 1000 * 2,
  })
}
