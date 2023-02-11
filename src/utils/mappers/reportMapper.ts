import { Report, ReportReq } from '../@types/report'

export function reportMapper(req: ReportReq) {
  const report: Report = {
    id: req.id,
    approved: req.approved,
    createdAt: req.created_at,
    description: req.description,
    title: req.title,
    type: req.type,
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
    price: req.payment_value,
  }

  return report
}
