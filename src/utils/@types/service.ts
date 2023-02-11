import { PatientReq } from './patient'
import { ReducedStaff } from './reducedStaff'
import { Role } from './staff'

export enum ServiceTypes {
  'EXAM',
  'MEDICAL_CARE',
  'HOME_CARE',
  'SURGERY',
  'EMERGENCY',
}

export enum ServiceStatus {
  'NOT_INITIALIZED',
  'IN_PROGRESS',
  'COMPLETED',
  'SCHEDULED',
  'WAITING_PAYMENT',
  'PAID',
  'CANCELED',
}

export type ServiceReq = {
  id: number
  created_at: string
  service_date: string
  title: string
  description: string
  price: number
  patient: PatientReq
  staff: ReducedStaff
  type: ServiceTypes
  status: ServiceStatus
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type Service = {
  id: number
  createdAt: string
  serviceDate: string
  title: string
  description: string
  price: number
  patient: PatientReq
  staff: {
    id: number
    fullName: string
    role: Role
  }
  type: ServiceTypes
  status: ServiceStatus
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}
