import ApiModel, { ApiDocument } from "@schema/Api"
import { ObjectId } from "mongodb"

export default class ApiRepository {
  async createApi(
    url: string,
    metodo: string,
    tipo: string
  ): Promise<ApiDocument | null> {
    try {
      return ApiModel.insertOne({
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
      return ApiModel.findById(_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteApi(_id: ObjectId): Promise<number | null> {
    try {
      const repositoryModel = await ApiModel.deleteOne(_id)

      return repositoryModel.deletedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
