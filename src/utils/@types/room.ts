import { Staff, StaffReq } from './staff'

export enum RoomType {
  'CLINIC',
  'EXAM',
  'EMERGENCY',
  'LABORATORY',
}

export type RoomReq = {
  id: number
  created_at: string
  in_use: boolean
  name: string
  type: RoomType
  staff: StaffReq
}

export type Room = {
  id: number
  createdAt: string
  inUse: boolean
  name: string
  type: RoomType
  staff: Staff
}
