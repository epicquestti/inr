import TipoUsuarioFuncoesModel from "@schema/TipoUsuarioFuncoes"
import { ObjectId } from "mongodb"

export default class TipoUsuarioFuncoesRepository {
  async createRelation(tipoUsuarioId: ObjectId, funcaoId: ObjectId) {
    return await TipoUsuarioFuncoesModel.insertOne({
      funcaoId: funcaoId,
      tipoUsuarioId: tipoUsuarioId
    })
  }

  async deleteRelations(tipoUsuarioId: ObjectId): Promise<number> {
    const dbResponse = await TipoUsuarioFuncoesModel.deleteMany({
      tipoUsuarioId: tipoUsuarioId
    })

    return dbResponse.deletedCount
  }

  async findRelations(tipoUsuarioId: ObjectId): Promise<any[]> {
    return await TipoUsuarioFuncoesModel.find({
      tipoUsuarioId: tipoUsuarioId
    })
  }
}
