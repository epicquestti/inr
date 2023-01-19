import ApiModel from "@schema/Api"
import FuncaoModel, { FuncaoDocument } from "@schema/Funcao"
import FuncaoApiModel from "@schema/FuncaoApi"
import tipoUsuarioModel from "@schema/TipoUsuario"
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
        acoes: params.acoes,
        icone: params.icone,
        nivel: params.nivel,
        nome: params.nome,
        root: params.root,
        tipo: params.tipo,
        tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
      })

      return funcaoCreation

      // if (params._id) {
      //   const funcaoExists = FuncaoModel.findOne({
      //     _id: params._id
      //   })

      //   if (!funcaoExists)
      //     throw new Error("Função com o ID fornecido não encontrada.")

      //   const dbResponse = await FuncaoModel.updateOne(
      //     { _id: params._id },
      //     {
      //       $set: {
      //         acoes: params.acoes,
      //         icone: params.icone,
      //         nivel: params.nivel,
      //         nome: params.nome,
      //         root: params.root,
      //         tipo: params.tipo,
      //         tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
      //       }
      //     }
      //   )

      //   await FuncaoApiModel.deleteMany({
      //     funcao: params._id
      //   })

      //   if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
      //     for (let i = 0; i < params.apisRelacionadas.length; i++) {
      //       await FuncaoApiModel.insertOne({
      //         api: new ObjectId(params.apisRelacionadas[i]),
      //         funcao: params._id
      //       })
      //     }
      //   }

      //   return dbResponse.modifiedCount
      // } else {

      //   if (funcaoCreation._id) {
      //     if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
      //       for (let i = 0; i < params.apisRelacionadas.length; i++) {
      //         await FuncaoApiModel.insertOne({
      //           api: new ObjectId(params.apisRelacionadas[i]),
      //           funcao: funcaoCreation._id
      //         })
      //       }
      //     }
      //   }

      //   return funcaoCreation
      // }
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
            acoes: params.acoes,
            icone: params.icone,
            nivel: params.nivel,
            nome: params.nome,
            root: params.root,
            tipo: params.tipo,
            tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
          }
        }
      )

      return dbResponse.modifiedCount
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

  async funcaoGetById(params: funcaoIdOutput) {
    try {
      const dbResponse = await FuncaoModel.findById(params.id)

      if (!dbResponse) throw new Error("Função não encontrada.")

      const apiRelacionadas = await FuncaoApiModel.find({
        funcao: params.id
      })

      const apiArray: ObjectId[] = []

      for (let i = 0; i < apiRelacionadas.length; i++) {
        apiArray.push(apiRelacionadas[i].api)
      }

      const apiSearch = await ApiModel.find({
        _id: { $in: apiArray }
      })

      const tipoUsuarioResponse = await tipoUsuarioModel.find({
        _id: {
          $in: dbResponse.tipoUsuarioAutorizado
        }
      })

      return {
        success: true,
        message: "Exibindo Função selecionada.",
        data: {
          funcao: dbResponse,
          apis: apiSearch,
          usuarios: tipoUsuarioResponse
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async funcaoVerifyRoot(
    root: string,
    id: ObjectId
  ): Promise<FuncaoDocument | null> {
    try {
      const dbResponse = await FuncaoModel.findOne({
        root: root,
        _id: {
          $not: id.id
        }
      })

      return dbResponse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
