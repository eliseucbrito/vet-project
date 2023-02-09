/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { parseCookies } from 'nookies'
import { ParsedUrlQuery } from 'querystring'
import { string } from 'zod'
import { api } from '../services/api'

export type ReportDetails = {
  id: number
  title: string
}

export type RoleHistoricDetails = {
  startedIn: string
  baseSalary: number
  weeklyWorkLoad: number
  promotedBy: {
    id: number
    fullName: string
    role:
      | 'CEO'
      | 'GENERAL_MANAGER'
      | 'MANAGER'
      | 'VETERINARY'
      | 'ASSISTANT'
      | 'INTERN'
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
  const { data: staffReportsData } = await api.get(`/api/reports/v1`, {
    params: {
      'staff-id': id,
    },
  })

  const { data: staffServices } = await api.get(`/api/services/v1`, {
    params: {
      'staff-id': id,
    },
  })

  const reports = staffReportsData.map((report: any) => {
    return {
      id: report.id,
      title: report.title,
    }
  })

  const roleHistoric: Array<RoleHistoricDetails> = []

  staffData.role_historic.map((obj: any) => {
    const historic = {
      startedIn: obj.started_in,
      baseSalary: obj.base_salary / 1000,
      weeklyWorkLoad: obj.weekly_work_load,
      promotedBy: {
        id: obj.promoter.id,
        fullName: obj.promoter.full_name,
        role: obj.promoter.role,
      },
      role: obj.role,
    }

    roleHistoric.unshift(historic)
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
    baseSalary: staffData.base_salary / 1000,
    createdAt: staffData.created_at,
    cpf: staffData.cpf,
    fullName: staffData.full_name,
    onDuty: staffData.on_duty,
    role: staffData.staff_role,
    weeklyWorkLoad: staffData.weekly_work_load,
    workLoadCompleted: staffData.work_load_completed,
    reports,
    services,
    roleHistoric,
  }

  return staff
}

export function useStaffDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['staff', id], () => getStaffDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
