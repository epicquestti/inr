import usuarioModel, { usuarioDocument } from "@schema/Usuario"
import { ObjectId } from "mongodb"

export default class UsuarioRepository {
  async getUserByEmail(email: string): Promise<usuarioDocument | null> {
    try {
      return await usuarioModel.findOne({
        email: email
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserById(_id: ObjectId): Promise<usuarioDocument | null> {
    try {
      return await usuarioModel.findById(_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
