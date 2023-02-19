import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../services/apiClient'
import { Room, RoomReq } from '../utils/@types/room'
import { Service } from '../utils/@types/service'
import { Staff } from '../utils/@types/staff'

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

export async function getClinicData(): Promise<ClinicData> {
  const { data: servicesData } = await api.get('/api/services/v1')
  const { data: staffData } = await api.get('/api/staff/v1')
  const { data: roomsData } = await api.get('/api/rooms/v1')

  const services: [] = servicesData.map((service: Service) => {
    return {
      createdAt: service.createdAt,
    }
  })

  let servicesTodayQnt = 0

  services.forEach((service: Service) => {
    const serviceDate = dayjs(new Date(service.createdAt))
    const isToday = serviceDate.get('date') === dayjs(new Date()).get('date')

    if (isToday) servicesTodayQnt++

    return servicesTodayQnt
  })

  const allStaff: [] = staffData.map((staff: Staff) => {
    return {
      onDuty: staff.onDuty,
    }
  })

  let staffOnDutyQnt = 0

  allStaff.forEach((staff: Staff) => {
    if (staff.onDuty) staffOnDutyQnt++

    return staffOnDutyQnt
  })

  const rooms = roomsData.map((room: RoomReq) => {
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
  return useQuery(['clinicData'], getClinicData, {
    staleTime: 1000 * 60 * 60,
  })
}
