import Updates, { updatesInterface } from "@schema/Updates"
import { Types } from "mongoose"
import { IUpdatesRepository } from "../IUpdatesRepository"

export class UpdateRepository implements IUpdatesRepository {
  async getById(
    _id: string
  ): Promise<(updatesInterface & { id: Types.ObjectId }) | null> {
    return await Updates.findOne({
      _id: _id
    })
  }
}
