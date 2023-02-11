import { RoleHistoric } from '../@types/roleHistoric'
import { Staff, StaffReq } from '../@types/staff'

export function staffMapper(req: StaffReq) {
  const staff: Staff = {
    id: req.id,
    avatarUrl: req.avatar_url,
    email: req.email,
    baseSalary: req.base_salary,
    createdAt: req.created_at,
    cpf: req.cpf,
    fullName: req.full_name,
    onDuty: req.on_duty,
    weeklyWorkLoad: req.weekly_work_load,
    workLoadCompleted: req.work_load_completed,
    role: req.role,
  }

  return staff
}
