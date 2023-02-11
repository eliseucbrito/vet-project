import { Room, RoomReq } from '../@types/room'
import { staffMapper } from './staffMapper'

export function roomMapper(req: RoomReq) {
  const staffFormatted = staffMapper(req.staff)

  const room: Room = {
    id: req.id,
    createdAt: req.created_at,
    inUse: req.in_use,
    name: req.name,
    type: req.type,
    staff: staffFormatted,
  }

  return room
}
