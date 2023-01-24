import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/api'

export type ReportDetails = {
  id: number
  title: string
}

export type RoleHistoricDetails = {
  id: number
  startedIn: string
  baseSalary: number
  weeklyWorkLoad: number
  promotedBy: {
    id: number
    fullName: string
  }
  role:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

export type StaffServicesDetails = {
  id: number
  createdAt: string
  patient: {
    name: string
    kind: string
  }
  type: 'EXAM' | 'MEDICAL_CARE' | 'HOME_CARE' | 'SURGERY' | 'EMERGENCY'
  status:
    | 'NOT_INITIALIZED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SCHEDULED'
    | 'WAITING_PAYMENT'
    | 'PAID'
    | 'CANCELED'
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type StaffDetailsType = {
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
  weeklyWorkLoad: number // in minutes
  workLoadCompleted: number
  reports: ReportDetails[]
  services: StaffServicesDetails[]
  roleHistoric: RoleHistoricDetails[]
}

export async function getStaffDetails(id: string): Promise<StaffDetailsType> {
  const { data: staffData } = await api.get(`/api/staff/v1/${id}`)
  const { data: staffReportsData } = await api.get(
    `/api/staff/v1/${id}/reports`,
  )
  const { data: roleHistoricData } = await api.get(
    `/api/staff/v1/${id}/role-historic`,
  )

  const { data: staffServices } = await api.get(`/api/services/v1/staff`, {
    params: {
      id,
    },
  })

  const reports = staffReportsData.map((report: any) => {
    return {
      id: report.id,
      title: report.title,
    }
  })

  const roleHistoric = roleHistoricData.map((obj) => {
    return {
      id: obj.id,
      startedIn: obj.started_in,
      baseSalary: obj.base_salary / 1000,
      weeklyWorkLoad: obj.weekly_work_load,
      promotedBy: {
        id: obj.promoted_by.id,
        fullName: obj.promoted_by.full_name,
      },
      role: obj.role,
    }
  })

  const services = staffServices.map((service: any) => {
    return {
      id: service.id,
      createdAt: service.created_at,
      patient: {
        name: service.patient.name,
        kind: service.patient.kind,
      },
      type: service.type,
      status: service.status,
      city: service.city,
    }
  })

  const staff: StaffDetailsType = {
    id: staffData.id,
    avatarUrl: staffData.avatar_url,
    email: staffData.email,
    baseSalary: staffData.base_salary,
    createdAt: staffData.created_at,
    cpf: staffData.cpf,
    fullName: staffData.full_name,
    onDuty: staffData.on_duty,
    role: staffData.staffRole,
    weeklyWorkLoad: staffData.weekly_work_load,
    workLoadCompleted: staffData.work_load_completed,
    reports,
    services,
    roleHistoric,
  }

  return staff
}

export function useStaffDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['staff', id], () => getStaffDetails(id))
}
