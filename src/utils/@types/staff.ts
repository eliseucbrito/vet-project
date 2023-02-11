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

export type StaffReq = {
  id: number
  avatar_url: string
  email: string
  base_salary: number
  created_at: string
  cpf: string
  full_name: string
  on_duty: boolean
  weekly_work_load: number
  work_load_completed: number | null
  role: Role
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
}
