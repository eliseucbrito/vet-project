import { RoleHistoric } from './roleHistoric'

export enum StaffRoles {
  'CEO',
  'GENERAL_MANAGER',
  'MANAGER',
  'VETERINARY',
  'ASSISTANT',
  'INTERN',
}

export type Role = {
  id: number
  description: StaffRoles
  authority: StaffRoles
}

export type Staff = {
  id: number
  avatarUrl: string
  email: string
  baseSalary: number
  createdAt: string
  cpf: string
  fullName: string
  onDuty: boolean
  weeklyWorkLoad: number
  workLoadCompleted: number | null
  role: Role
  role_historic: RoleHistoric[]
}
