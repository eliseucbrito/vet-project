import { ReducedStaff } from './reducedStaff'

export type RoleHistoric = {
  startedIn: string
  role: string
  baseSalary: number
  weeklyWorkLoad: number
  promoter: ReducedStaff
}
