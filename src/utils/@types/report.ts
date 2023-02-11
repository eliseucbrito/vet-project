import { ReducedStaff } from './reducedStaff'
import { Staff, StaffReq } from './staff'

export enum ReportType {
  'PAYMENT',
  'REQUEST',
  'REPORT',
  'APPROVED',
  'REJECTED',
}

export type ReportRequest = {
  id: number
  approved: boolean | null
  created_at: string
  description: string
  title: string
  type: ReportType
  staff: ReducedStaff
  payment_value: number
}

export type Report = {
  id: number
  approved: boolean
  createdAt: string
  description: string
  title: string
  type: ReportType
  staff: Staff
}
