import FuncaoModel, { FuncaoDocument } from "@schema/Funcao"
import { ObjectId } from "mongodb"

export default class FuncaoRepository {
  async getSuperFunctions(): Promise<FuncaoDocument[]> {
    try {
      return await FuncaoModel.find({
        tipo: {
          $ne: "internal"
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getFunctionLivreByTipo(tipoUsuario: ObjectId) {
    try {
      return await FuncaoModel.find({
        tipoUsuarioAutorizado: tipoUsuario
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
