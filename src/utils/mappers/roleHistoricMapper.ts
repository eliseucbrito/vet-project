/* eslint-disable camelcase */
import { RoleHistoric, RoleHistoricReq } from '../@types/roleHistoric'

export function roleHistoricMapper(role: RoleHistoricReq) {
  const historic: RoleHistoric = {
    startedIn: role.started_in,
    role: role.role,
    baseSalary: role.base_salary,
    weeklyWorkLoad: role.weekly_work_load,
    promoter: {
      id: role.promoter.id,
      fullName: role.promoter.full_name,
      avatarUrl: role.promoter.avatar_url,
      role: role.promoter.role,
    },
  }
  return historic
}
