/* eslint-disable array-callback-return */
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../services/apiClient'
import { ReportRequest, Service, ServiceRequest } from './useClinicData'

type weekDayFinanceArray = {}

export type FinancesProps = {
  incomes: number[]
  outcomes: number[]
  profits: number[]
  weekIncomes: number
  weekOutcomes: number
  weekProfits: number
}

export async function getFinances(): Promise<FinancesProps> {
  const { data: reportsData } = await api.get('/api/reports/v1')
  const { data: servicesData } = await api.get('/api/services/v1')

  const weekDayFinance = [
    { weekDay: 0, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 1, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 2, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 3, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 4, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 5, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 6, incomes: 0, outcomes: 0, profits: 0 },
    { weekDay: 7, incomes: 0, outcomes: 0, profits: 0 },
  ]

  reportsData.map((report, index) => {
    if (report === undefined || report.type !== 'PAYMENT') {
      // eslint-disable-next-line no-useless-return
      return
    }

    const reportDay = dayjs(report.created_at)
    const oneWeekAgo = dayjs(new Date())
      .subtract(7, 'day')
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .set('milliseconds', 0)
    const today = dayjs(new Date())

    if (reportDay >= oneWeekAgo && reportDay <= today) {
      const daysAgo = reportDay.diff(oneWeekAgo, 'days')
      weekDayFinance[daysAgo].outcomes += report.payment_value / 1000
    }
  })

  servicesData.map((service, index) => {
    if (service === undefined || service.status !== 'PAID') {
      // eslint-disable-next-line no-useless-return
      return
    }

    const serviceDay = dayjs(service.created_at)
    const oneWeekAgo = dayjs(new Date())
      .subtract(7, 'day')
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .set('milliseconds', 0)
    const today = dayjs(new Date())

    if (serviceDay >= oneWeekAgo && serviceDay <= today) {
      const daysAgo = serviceDay.diff(oneWeekAgo, 'days')

      weekDayFinance[daysAgo].incomes += service.price / 1000
    }
  })

  const seriesIncomesData = [0, 0, 0, 0, 0, 0, 0, 0]
  const seriesOutcomesData = [0, 0, 0, 0, 0, 0, 0, 0]
  const seriesProfitsData = [0, 0, 0, 0, 0, 0, 0, 0]
  let weekIncomes = 0
  let weekOutcomes = 0
  let weekProfits = 0

  weekDayFinance.map((day, index) => {
    seriesIncomesData[index] += day.incomes
    seriesOutcomesData[index] += day.outcomes
    seriesProfitsData[index] += day.incomes - day.outcomes

    weekIncomes += day.incomes
    weekOutcomes += day.outcomes
    weekProfits += day.profits
  })

  return {
    incomes: seriesIncomesData,
    outcomes: seriesOutcomesData,
    profits: seriesProfitsData,
    weekIncomes,
    weekOutcomes,
    weekProfits,
  }
}

export function useFinancialStatistics() {
  return useQuery(['finances'], getFinances, {
    staleTime: 1000 * 60 * 60,
  })
}
