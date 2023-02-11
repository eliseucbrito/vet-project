import { Service, ServiceReq, ServiceTypes } from '../@types/service'
import { patientMapper } from './patientMapper'

export function serviceMapper(req: ServiceReq) {
  const patientConverted = patientMapper(req.patient)

  const service: Service = {
    id: req.id,
    createdAt: req.created_at,
    serviceDate: req.service_date,
    title: req.title,
    description: req.description,
    price: req.price,
    patient: patientConverted,
    staff: {
      id: req.staff.id,
      fullName: req.staff.full_name,
      role: {
        id: req.staff.role.id,
        description: req.staff.role.description,
        authority: req.staff.role.authority,
      },
      avatarUrl: req.staff.avatar_url,
    },
    type: req.type,
    status: req.status,
    city: req.city,
  }

  return service
}
