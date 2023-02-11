import { ReducedStaff, ReducedStaffReq } from './reducedStaff'
import { Staff, StaffReq } from './staff'

export enum ReportType {
  'PAYMENT',
  'REQUEST',
  'REPORT',
  'APPROVED',
  'REJECTED',
}

export type ReportReq = {
  id: number
  approved: boolean | null
  created_at: string
  description: string
  title: string
  type: ReportType
  staff: ReducedStaffReq
  payment_value: number | null
}

export type Report = {
  id: number
  approved: boolean | null
  createdAt: string
  description: string
  title: string
  type: ReportType
  staff: ReducedStaff
  price: number | null
}
