import { ReducedStaff } from './reducedStaff'

export enum ReportType {
  'PAYMENT',
  'REQUEST',
  'REPORT',
  'APPROVED',
  'REJECTED',
}

export type Report = {
  id: number
  approved: boolean | null
  createdAt: string
  description: string
  title: string
  type: ReportType
  staff: ReducedStaff
  paymentValue: number | null
}
