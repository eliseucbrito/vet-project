/* eslint-disable camelcase */
import { RoleHistoric } from '../@types/roleHistoric'

export function roleHistoricMapper(role: RoleHistoric) {
  const historic: RoleHistoric = {
    ...role,
  }
  return historic
}
