import { Types } from "mongoose"
import { updatesInterface } from "../schemas/Updates"
export interface IUpdatesRepository {
  getById(
    _id: string
  ): Promise<(updatesInterface & { id: Types.ObjectId }) | null>
}
