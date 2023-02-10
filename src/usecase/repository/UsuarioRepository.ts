import usuarioModel, { usuarioDocument } from "@schema/Usuario"
import { usuarioSaveOutput } from "@validation/Usuario/usuarioSave"
import { ObjectId } from "mongodb"

export default class UsuarioRepository {
  async getUserByEmail(email: string): Promise<usuarioDocument | null> {
    try {
      return await usuarioModel.findOne({
        email: {
          $eq: email
        }
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

  async usuarioCreate(
    params: usuarioSaveOutput
  ): Promise<usuarioDocument | null> {
    try {
      return await usuarioModel.insertOne({
        email: params.email,
        senha: params.senha,
        tipoUsuario: params.tipoUsuario.id.toString()
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async usuarioUpdate(params: usuarioSaveOutput): Promise<number> {
    try {
      const dbResponse = await usuarioModel.updateOne(
        { _id: params._id },
        {
          $set: {
            email: params.email,
            senha: params.senha,
            tipoUsuario: params.tipoUsuario
          }
        }
      )

      return dbResponse.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
