/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { ReportReq } from '../utils/@types/report'
import { RoleHistoric } from '../utils/@types/roleHistoric'
import { ServiceReq } from '../utils/@types/service'
import { StaffReq } from '../utils/@types/staff'
import { StaffDetails } from '../utils/@types/staffDetails'
import { roleHistoricMapper } from '../utils/mappers/roleHistoricMapper'
import { serviceMapper } from '../utils/mappers/serviceMapper'

export async function getStaffDetails(id: string): Promise<StaffDetails> {
  const { data: staffData } = await api.get<StaffReq>(`/api/staff/v1/${id}`)
  const { data: staffReportsData } = await api.get<ReportReq[]>(
    `/api/reports/v1`,
    {
      params: {
        'staff-id': id,
      },
    },
  )

  const { data: staffServices } = await api.get<ServiceReq[]>(
    `/api/services/v1`,
    {
      params: {
        'staff-id': id,
      },
    },
  )

  const reports = staffReportsData.map((report: any) => {
    return {
      id: report.id,
      title: report.title,
    }
  })

  const roleHistoric: RoleHistoric[] = roleHistoricMapper(
    staffData.role_historic,
  )

  const services = staffServices.map((service) => {
    const serviceConverted = serviceMapper(service)

    return service
  })

  const staff: StaffDetails = {
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
