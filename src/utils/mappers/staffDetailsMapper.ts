import { api } from '../../services/apiClient'
import { RoleHistoric } from '../@types/roleHistoric'
import { StaffReq } from '../@types/staff'
import { StaffDetails } from '../@types/staffDetails'
import { roleHistoricMapper } from './roleHistoricMapper'

export function staffDetailsMapper(req: StaffReq) {
  const roleHistoric = roleHistoricMapper(req.role_historic)

  const staffDetails: StaffDetails = {
    id: req.id,
    avatarUrl: req.avatar_url,
    email: req.email,
    baseSalary: req.base_salary,
    createdAt: req.created_at,
    cpf: req.cpf,
    fullName: req.full_name,
    onDuty: req.on_duty,
    role: {
      id: req.role.id,
      description: req.role.description,
      authority: req.role.authority,
    },
    weeklyWorkLoad: req.weekly_work_load,
    workLoadCompleted: req.work_load_completed,
    reports: [],
    services: [],
    roleHistoric,
  }

  return staffDetails
}
