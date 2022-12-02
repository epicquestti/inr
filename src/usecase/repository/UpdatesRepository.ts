import updatesModel, { updatesDocument } from "@schema/Updates"
import { ObjectId } from "mongodb"

export default class UpdatesRepository {
  async getUpdateById(_id: ObjectId): Promise<updatesDocument | null> {
    return updatesModel.findOne({
      _id
    })
  }

  async updateList(
    limit: number,
    page: number,
    version?: number,
    major?: number,
    minor?: number,
    severity?: string
  ): Promise<updatesDocument[]> {
    const filter: any = {}
    if (version) filter.version = version
    if (major) filter.major = major
    if (minor) filter.minor = minor
    if (severity) filter.severity = severity

    return await updatesModel.find(filter, {
      sort: ["asc"],
      limit,
      skip: page * limit
    })
  }

  async updateListCount(
    version?: number,
    major?: number,
    minor?: number,
    severity?: string
  ): Promise<number> {
    const filter: any = {}
    if (version) filter.version = version
    if (major) filter.major = major
    if (minor) filter.minor = minor
    if (severity) filter.severity = severity
    return await updatesModel.countDocuments(filter)
  }
}
