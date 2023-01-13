import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { ReportRequest, ServiceRequest } from './useClinicData'

type BillingStatics = {
  billing: number
  expenses: number
  profits: number
}

export async function getBillingStatics(): Promise<BillingStatics> {
  const { data: reportsData } = await api.get('/reports')
  const { data: servicesData } = await api.get('/services')

  const expensesStatics = 0

  const reports = reportsData.map((report: ReportRequest) => {
    // ADD && REPORT.STATUS === 'APPROVED'
    if (report.type === 'PAYMENT') {
      // paymentsStatics += report.price
    }

    return {
      id: report.id,
      approved: report.approved,
      created_at: report.created_at,
      type: report.type,
      title: report.title,
    }
  })

  let billingStatics = 0

  const services = servicesData.map((service: ServiceRequest) => {
    if (service.status === 'PAID') {
      billingStatics += service.price
    }

    return {
      id: service.id,
      status: service.status,
      created_at: service.created_at,
      price: service.price,
      type: service.type,
      city: service.city,
    }
  })

  const statics: BillingStatics = {
    billing: billingStatics / 1000,
    expenses: expensesStatics / 1000,
    profits: billingStatics - expensesStatics,
  }

  return statics
}

export function useBillingStatics() {
  return useQuery(['billing statics'], getBillingStatics)
}
