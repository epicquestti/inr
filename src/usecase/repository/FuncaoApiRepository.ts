import FuncaoApiModel from "@schema/FuncaoApi"
import { ObjectId } from "mongodb"

export default class FuncaoApiRepository {
  async createRelation(funcaoId: ObjectId, apiId: ObjectId): Promise<void> {
    await FuncaoApiModel.insertOne({
      api: apiId,
      funcao: funcaoId
    })
  }
}
