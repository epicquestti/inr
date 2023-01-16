import FuncaoModel, { FuncaoDocument } from "@schema/Funcao"
import FuncaoApiModel from "@schema/FuncaoApi"
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

  async funcaoSave(params: funcaoSaveOutput) {
    try {
      if (params._id) {
        const funcaoExists = FuncaoModel.findOne({
          _id: params._id
        })

        if (!funcaoExists)
          throw new Error("Função com o ID fornecido não encontrada.")

        await FuncaoModel.updateOne(
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

        await FuncaoApiModel.deleteMany({
          funcao: params._id
        })

        if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
          for (let i = 0; i < params.apisRelacionadas.length; i++) {
            await FuncaoApiModel.insertOne({
              api: new ObjectId(params.apisRelacionadas[i]),
              funcao: params._id
            })
          }
        }

        return {
          success: true,
          message: "Função editada com sucesso.",
          data: params._id
        }
      } else {
        const funcaoCreation = await FuncaoModel.insertOne({
          acoes: params.acoes,
          icone: params.icone,
          nivel: params.nivel,
          nome: params.nome,
          root: params.root,
          tipo: params.tipo,
          tipoUsuarioAutorizado: params.tipoUsuarioAutorizado
        })

        console.log(funcaoCreation)

        if (funcaoCreation._id) {
          if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
            console.log("Entrou888")
            for (let i = 0; i < params.apisRelacionadas.length; i++) {
              await FuncaoApiModel.insertOne({
                api: new ObjectId(params.apisRelacionadas[i]),
                funcao: funcaoCreation._id
              })
            }
          }
        }

        return {
          success: true,
          message: "Função criada com sucesso.",
          data: funcaoCreation._id
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
