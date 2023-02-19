import { Role } from './staff'

export type ReducedStaff = {
  id: number
  fullName: string
  avatarUrl: string
  role: Role
}
