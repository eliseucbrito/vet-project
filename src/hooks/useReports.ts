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
  sity: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

type StaffUser = {
  id: number
  avatar_url: string
  email: string
  password: string
  base_salary: number
  created_at: Date
  cpf: string
  full_name: string
  staff_role:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

type Report = {
  id: number
  approved: boolean
  created_at: Date
  description: string
  title: string
  type: 'PAYMENT' | 'REQUEST' | 'REPORT' | 'APPROVED' | 'REJECTED'
  staff: StaffUser
}

export async function getReports(): Promise<Report[]> {
  const { data } = await api.get('/reports')

  const reports = data.map((report: Report) => {
    return {
      id: report.id,
      approved: report.approved,
      created_at: report.created_at,
      description: report.description,
      title: report.title,
      type: report.type,
      staff: report.staff,
    }
  })

  return reports
}

export function useReports() {
  return useQuery(['reports'], getReports)
}
