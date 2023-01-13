import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../services/api'

export type PatientRequest = {
  id: number
  avatar_url: string
  birth_date: string
  kind: string
  name: string
  owner: string
  owner_contact: string
  breed: string
}

export type Patient = {
  id: number
  avatarUrl: string
  birthDate: string
  kind: string
  name: string
  owner: string
  ownerContact: string
  breed: string
}

export type StaffRequest = {
  id: number
  avatar_url: string
  email: string
  password: string
  base_salary: number
  created_at: Date
  cpf: string
  full_name: string
  on_duty: boolean
  staffRole:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

export type Staff = {
  id: number
  avatarUrl: string
  email: string
  password: string
  baseSalary: number
  createdAt: Date
  cpf: string
  fullName: string
  onDuty: boolean
  role:
    | 'CEO'
    | 'GENERAL_MANAGER'
    | 'MANAGER'
    | 'VETERINARY'
    | 'ASSISTANT'
    | 'INTERN'
}

export type ServiceRequest = {
  id: number
  avatar_url: string
  created_at: string
  description: string
  price: number
  patient: PatientRequest
  staff: StaffRequest
  type: 'EXAM' | 'MEDICAL_CARE' | 'HOME_CARE' | 'SURGERY' | 'EMERGENCY'
  status:
    | 'NOT_INITIALIZED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SCHEDULED'
    | 'WAITING_PAYMENT'
    | 'PAID'
    | 'CANCELED'
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type Service = {
  id: number
  avatarUrl: string
  createdAt: string
  description: string
  price: number
  patient: Patient
  staff: Staff
  type: 'EXAM' | 'MEDICAL_CARE' | 'HOME_CARE' | 'SURGERY' | 'EMERGENCY'
  status:
    | 'NOT_INITIALIZED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SCHEDULED'
    | 'WAITING_PAYMENT'
    | 'PAID'
    | 'CANCELED'
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type ClinicData = {
  clients: {
    total: number
    today: number
  }
  staff: {
    total: number
    onDuty: number
  }
  rooms: {
    total: number
    available: number
  }
}

export type RoomRequest = {
  id: number
  created_at: Date
  in_use: boolean
  name: string
  type: 'CLINIC' | 'EXAM' | 'EMERGENCY' | 'LABORATORY'
  staff: StaffRequest
}

export type Room = {
  id: number
  createdAt: Date
  inUse: boolean
  name: string
  type: 'CLINIC' | 'EXAM' | 'EMERGENCY' | 'LABORATORY'
  staff: Staff
}

export type ReportRequest = {
  id: number
  approved: boolean
  created_at: Date
  description: string
  title: string
  type: 'PAYMENT' | 'REQUEST' | 'REPORT' | 'APPROVED' | 'REJECTED'
  staff: StaffRequest
}

export type Report = {
  id: number
  approved: boolean
  createdAt: Date
  description: string
  title: string
  type: 'PAYMENT' | 'REQUEST' | 'REPORT' | 'APPROVED' | 'REJECTED'
  staff: Staff
}

export async function getClinicData(): Promise<ClinicData> {
  const { data: servicesData } = await api.get('/services')
  const { data: staffData } = await api.get('/staff')
  const { data: roomsData } = await api.get('/rooms')

  const services = servicesData.map((service: ServiceRequest) => {
    return {
      createdAt: service.created_at,
    }
  })

  let servicesTodayQnt = 0

  const servicesToday = await services.map((service: Service) => {
    const serviceDate = dayjs(new Date(service.createdAt))
    const isToday = serviceDate.get('date') === dayjs(new Date()).get('date')

    if (isToday) servicesTodayQnt++

    return servicesTodayQnt
  })

  const allStaff = staffData.map((staff: StaffRequest) => {
    return {
      onDuty: staff.on_duty,
    }
  })

  let staffOnDutyQnt = 0

  const staffOnDuty = allStaff.map((staff: Staff) => {
    if (staff.onDuty) staffOnDutyQnt++

    return staffOnDutyQnt
  })

  const rooms = roomsData.map((room: RoomRequest) => {
    return {
      inUse: room.in_use,
    }
  })

  let roomsInUseQnt = 0

  const roomsInUse = rooms.map((room: Room) => {
    if (!room.inUse) roomsInUseQnt++

    return roomsInUseQnt
  })

  const clinicData: ClinicData = {
    clients: {
      total: services.length,
      today: servicesTodayQnt,
    },
    staff: {
      total: allStaff.length,
      onDuty: staffOnDutyQnt,
    },
    rooms: {
      total: rooms.length,
      available: roomsInUseQnt,
    },
  }

  return clinicData
}

export function useClinicData() {
  return useQuery(['clinicData'], getClinicData)
}
