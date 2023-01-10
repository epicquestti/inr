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
}
