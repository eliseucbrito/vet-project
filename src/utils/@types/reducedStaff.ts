import { Role } from './staff'

export type ReducedStaff = {
  id: number
  full_name: string
  avatar_url: string
  role: Role
}
