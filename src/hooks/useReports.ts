import { useQuery } from '@tanstack/react-query'
import { api } from '../services/apiClient'
import { Report, ReportReq } from '../utils/@types/report'
import { reportMapper } from '../utils/mappers/reportMapper'

export async function getReports(): Promise<Report[]> {
  const { data } = await api.get('/api/reports/v1')

  const reports = data.map((report: ReportReq) => {
    const reportConverted = reportMapper(report)

    return reportConverted
  })

  return reports
}

export function useReports() {
  return useQuery(['reports'], getReports, {
    staleTime: 1000 * 60 * 60,
  })
}
