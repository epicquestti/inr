import { connect } from "@lib/backend"
import ApiModel, { ApiDocument } from "@schema/Api"
import { ObjectId } from "mongodb"

export default class ApiRepository {
  async createApi(
    url: string,
    metodo: string,
    tipo: string
  ): Promise<ApiDocument | null> {
    try {
      await connect()
      return await ApiModel.insertOne({
        url,
        method: metodo,
        type: tipo
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateApi(
    _id: ObjectId,
    url: string,
    method: string,
    type: string
  ): Promise<number> {
    try {
      await connect()

      const res = await ApiModel.updateOne(
        {
          _id: _id
        },
        {
          $set: {
            url: url,
            method: method,
            type: type
          }
        }
      )

      return res.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getApiById(_id: ObjectId): Promise<ApiDocument | null> {
    try {
      await connect()

      return ApiModel.findById(_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteApi(_id: ObjectId): Promise<number | null> {
    console.log(_id)

    try {
      await connect()

      const repositoryModel = await ApiModel.deleteOne({
        _id: _id
      })

      return repositoryModel.deletedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
