import tipoUsuarioModel, { tipoUsuarioDocument } from "@schema/TipoUsuario"
import { ObjectId } from "mongodb"

export default class TipoUsuarioRepository {
  async getTipoUsuarioById(
    tipoUsuarioId: ObjectId
  ): Promise<tipoUsuarioDocument | null> {
    try {
      return await tipoUsuarioModel.findById(tipoUsuarioId)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async tipoUsuarioGetList(
    tipoUsuarioArray: ObjectId[]
  ): Promise<tipoUsuarioDocument[] | null> {
    try {
      const dbResponse = await tipoUsuarioModel.find({
        _id: {
          $in: tipoUsuarioArray
        }
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
