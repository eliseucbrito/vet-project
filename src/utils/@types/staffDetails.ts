import { RoleHistoric } from './roleHistoric'
import { ServiceReduced } from './service'
import { Role } from './staff'

export type StaffDetails = {
  id: number
  avatarUrl: string
  email: string
  baseSalary: number
  createdAt: string
  cpf: string
  fullName: string
  onDuty: boolean
  role: Role
  weeklyWorkLoad: number // in minutes
  workLoadCompleted: number | null
  reports: {
    id: number
    title: string
  }[]
  services: ServiceReduced[]
  roleHistoric: RoleHistoric[]
}
