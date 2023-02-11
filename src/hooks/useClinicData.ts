import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../services/apiClient'

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
  return useQuery(['clinicData'], getClinicData, {
    staleTime: 1000 * 60 * 60,
  })
}
