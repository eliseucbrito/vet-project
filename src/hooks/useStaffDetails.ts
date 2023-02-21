/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Report } from '../utils/@types/report'
import { RoleHistoric } from '../utils/@types/roleHistoric'
import { Service } from '../utils/@types/service'
import { Staff } from '../utils/@types/staff'
import { StaffDetails } from '../utils/@types/staffDetails'
import { roleHistoricMapper } from '../utils/mappers/roleHistoricMapper'

export async function getStaffDetails(id: string): Promise<StaffDetails> {
  const { data: staffData } = await api.get<Staff>(`/api/staff/v1/${id}`)
  const { data: staffReportsData } = await api.get<Report[]>(
    `/api/reports/v1`,
    {
      params: {
        'staff-id': id,
      },
    },
  )

  const { data: staffServices } = await api.get<Service[]>(`/api/services/v1`, {
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

  const roleHistoricArray: RoleHistoric[] = []

  staffData.role_historic.forEach((roleHistoric) => {
    const role = roleHistoricMapper(roleHistoric)
    roleHistoricArray.unshift(role)
  })

  const services = staffServices.map((service) => {
    return {
      ...service,
    }
  })

  const staff: StaffDetails = {
    ...staffData,
    reports,
    services,
    roleHistoric: roleHistoricArray,
  }

  return staff
}

export function useStaffDetails(id: string, option?: UseQueryOptions) {
  return useQuery(['staff', id], () => getStaffDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
