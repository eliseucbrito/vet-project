import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { object } from 'zod'
import { api } from '../services/apiClient'
import { Report } from '../utils/@types/report'

export async function getReports(): Promise<Report[]> {
  const { data } = await api.get('/api/reports/v1')

  const reports = data.map((report: Report) => {
    const reportConverted = {
      ...report,
    }

    return reportConverted
  })

  return reports
}

export function useReports(options?: UseQueryOptions) {
  return useQuery(['reports'], getReports, {
    staleTime: 1000 * 60 * 60,
  })
}

export async function getReportDetails(id: string): Promise<Report> {
  const { data: report } = await api.get(`/api/reports/v1/${id}`)

  return {
    ...report,
  }
}

export function useReportDetails(id: string, options?: UseQueryOptions) {
  return useQuery(['report', id], () => getReportDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
