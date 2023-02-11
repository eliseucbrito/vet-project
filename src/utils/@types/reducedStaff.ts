import { Role } from './staff'

export type ReducedStaffReq = {
  id: number
  full_name: string
  avatar_url: string
  role: Role
}

export type ReducedStaff = {
  id: number
  fullName: string
  avatarUrl: string
  role: Role
}
