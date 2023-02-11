import { ReducedStaff, ReducedStaffReq } from './reducedStaff'

export type RoleHistoricReq = {
  started_in: string
  role: string
  base_salary: number
  weekly_work_load: number
  promoter: ReducedStaffReq
}

export type RoleHistoric = {
  startedIn: string
  role: string
  baseSalary: number
  weeklyWorkLoad: number
  promoter: ReducedStaff
}
