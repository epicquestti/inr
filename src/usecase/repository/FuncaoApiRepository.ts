import FuncaoApiModel, { FuncaoApiDocument } from "@schema/FuncaoApi"
import { ObjectId } from "mongodb"

export default class FuncaoApiRepository {
  async createRelation(fapiArray: any[]) {
    try {
      await FuncaoApiModel.insertMany(fapiArray)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteRelations(funcaoId: ObjectId): Promise<number> {
    const dbResponse = await FuncaoApiModel.deleteMany({
      funcao: funcaoId
    })

    return dbResponse.deletedCount
  }

  async funcaoApiGetApis(id: ObjectId): Promise<FuncaoApiDocument[] | null> {
    try {
      const dbResponse = await FuncaoApiModel.find({
        funcao: id
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
