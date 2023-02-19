import { Report, ReportReq } from '../@types/report'

export function reportMapper(req: ReportReq) {
  const report: Report = {
    ...req,
    price: req.paymentValue,
  }

  return report
}
