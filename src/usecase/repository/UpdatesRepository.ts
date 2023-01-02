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

  async getVigentNotId(id: string): Promise<updatesDocument[]> {
    try {
      return updatesModel.find({
        vigent: true,
        _id: {
          $ne: new ObjectId(id)
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async changeVigantState(id: ObjectId, state: boolean): Promise<number> {
    try {
      const result = await updatesModel.updateOne(
        {
          _id: id
        },
        {
          $set: {
            vigent: state
          }
        }
      )

      return result.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verifyIfExist(
    verison: number,
    major: number,
    minor: number
  ): Promise<updatesDocument | null> {
    try {
      return updatesModel.findOne({
        verison,
        major,
        minor
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async novaVersion(
    version: number,
    major: number,
    minor: number,
    severity: string,
    link: string,
    vigent: boolean
  ) {
    try {
      return updatesModel.insertOne({
        version,
        major,
        minor,
        link,
        severity,
        vigent
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verifyIfExistNotEqualId(
    _id: ObjectId,
    verison: number,
    major: number,
    minor: number
  ): Promise<updatesDocument | null> {
    try {
      return updatesModel.findOne({
        verison,
        major,
        minor,
        _id: {
          $ne: _id
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateVersion(
    _id: ObjectId,
    version: number,
    major: number,
    minor: number,
    vigent: boolean,
    severity: string,
    link: string
  ): Promise<number> {
    try {
      const response = await updatesModel.updateOne(
        {
          _id: _id
        },
        {
          $set: {
            version,
            major,
            minor,
            vigent,
            severity,
            link
          }
        }
      )
      return response.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
