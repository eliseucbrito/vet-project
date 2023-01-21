import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/api'
import { PatientRequest } from './useClinicData'

export type ReportDetails = {
  id: number
  title: string
}

export type StaffDetails = {
  id: number
  avatarUrl: string
  email: string
  baseSalary: number
  createdAt: Date
  cpf: string
  fullName: string
  onDuty: boolean
  role:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
  reports: ReportDetails[]
}

export async function getStaffDetails(id: string) {
  const { data: staffData } = await api.get(`/api/staff/v1/${id}`)
  const { data: staffReportsData } = await api.get(
    `/api/staff/v1/${id}/reports`,
  )

  const reports = staffReportsData.map((report: any) => {
    return {
      id: report.id,
      title: report.title,
    }
  })

  const staff: StaffDetails = {
    id: staffData.id,
    avatarUrl: staffData.avatar_url,
    email: staffData.email,
    baseSalary: staffData.base_salary,
    createdAt: staffData.created_at,
    cpf: staffData.cpf,
    fullName: staffData.full_name,
    onDuty: staffData.on_duty,
    role: staffData.staffRole,
    reports,
  }

  return staff
}

export function useStaffDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['staff', id], () => getStaffDetails(id))
}
