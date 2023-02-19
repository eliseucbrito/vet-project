import { Staff } from './staff'

export enum RoomType {
  'CLINIC',
  'EXAM',
  'EMERGENCY',
  'LABORATORY',
}

export type RoomReq = {
  id: number
  createdAt: string
  in_use: boolean
  name: string
  type: RoomType
  staff: Staff
}

export type Room = {
  id: number
  createdAt: string
  inUse: boolean
  name: string
  type: RoomType
  staff: Staff
}
