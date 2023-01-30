import tipoUsuarioModel, { tipoUsuarioDocument } from "@schema/TipoUsuario"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"
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

  async tipoUsuarioGetByNome(nome: string) {
    try {
      return await tipoUsuarioModel.findOne({
        nome
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async tipoUsuarioSave(
    params: tipoUsuarioSaveOutput
  ): Promise<tipoUsuarioDocument | null> {
    try {
      const dbResponse = await tipoUsuarioModel.insertOne({
        _id: params._id,
        nome: params.nome,
        super: params.super
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async tipoUsuarioUpdate(params: tipoUsuarioSaveOutput): Promise<number> {
    try {
      const dbResponse = await tipoUsuarioModel.updateOne(
        {
          _id: params._id
        },
        {
          $set: {
            nome: params.nome,
            super: params.super
          }
        }
      )

      return dbResponse.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
