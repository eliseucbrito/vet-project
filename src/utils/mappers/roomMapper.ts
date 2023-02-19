import { Room, RoomReq } from '../@types/room'

export function roomMapper(req: RoomReq) {
  const room: Room = {
    ...req,
    inUse: req.in_use,
  }

  return room
}
