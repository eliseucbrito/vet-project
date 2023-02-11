import { Patient, PatientReq } from '../@types/patient'

export function patientMapper(req: PatientReq) {
  const patient: Patient = {
    id: req.id,
    createdAt: req.created_at,
    avatarUrl: req.avatar_url,
    birthDate: req.birth_date,
    kind: req.kind,
    name: req.name,
    owner: req.owner,
    ownerContact: req.owner_contact,
    breed: req.breed,
  }

  return patient
}
