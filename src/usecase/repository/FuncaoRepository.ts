import FuncaoModel, { FuncaoDocument } from "@schema/Funcao"
import FuncaoApiModel from "@schema/FuncaoApi"
import { funcaoIdOutput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"
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

  async funcaoSave(params: funcaoSaveOutput): Promise<FuncaoDocument | null> {
    try {
      const funcaoCreation = await FuncaoModel.insertOne({
        // acoes: params.acoes,
        icone: params.icone,
        nivel: params.nivel,
        nome: params.nome,
        root: params.root,
        tipo: params.tipo
        // tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
      })

      return funcaoCreation
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoUpdate(params: funcaoSaveOutput): Promise<number> {
    try {
      const dbResponse = await FuncaoModel.updateOne(
        { _id: params._id },
        {
          $set: {
            // acoes: params.acoes,
            icone: params.icone,
            nivel: params.nivel,
            nome: params.nome,
            root: params.root,
            tipo: params.tipo
            // tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
          }
        }
      )

      return dbResponse.matchedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoDelete(params: funcaoIdOutput) {
    try {
      const dbResponse = await FuncaoModel.deleteOne({
        _id: params.id
      })

      if (dbResponse.deletedCount > 0) {
        await FuncaoApiModel.deleteMany({
          funcao: params.id
        })
      } else {
        throw new Error("Erro ao excluir função.")
      }

      return {
        success: true,
        message: "Função excluída com sucesso."
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoGetById(params: funcaoIdOutput): Promise<FuncaoDocument | null> {
    try {
      const dbResponse = await FuncaoModel.findById(params.id)

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoVerifyRoot(root: string): Promise<FuncaoDocument | null> {
    try {
      const dbResponse = await FuncaoModel.findOne({
        root: root
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoVerifyRootWithId(
    root: string,
    id: ObjectId
  ): Promise<FuncaoDocument | null> {
    try {
      const dbResponse = await FuncaoModel.findOne({
        root: root,
        _id: { $ne: id }
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
