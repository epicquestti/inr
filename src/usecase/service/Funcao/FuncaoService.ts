import { defaultResponse } from "@lib/types/defaultResponse"
import FuncaoApiRepository from "@usecase/repository/FuncaoApiRepository"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import { funcaoIdOutput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"
import { ObjectId } from "mongodb"
import IFuncaoService from "./IFuncaoService"

export default class FuncaoService implements IFuncaoService {
  constructor(
    private _funcaoRepository: FuncaoRepository,
    private _funcaoApiRepository: FuncaoApiRepository
  ) {}

  async funcaoSave(params: funcaoSaveOutput): Promise<defaultResponse> {
    console.log("Service", params)

    try {
      if (!params._id) {
        const verifyRoot = await this._funcaoRepository.funcaoVerifyRoot(
          params.root,
          new ObjectId("")
        )

        if (verifyRoot)
          throw new Error(
            "Já existe uma Função cadastrada com o Root fornecido."
          )

        const saveResponse = await this._funcaoRepository.funcaoSave(params)

        if (saveResponse) {
          if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
            for (let i = 0; i < params.apisRelacionadas.length; i++) {
              await this._funcaoApiRepository.createRelation(
                saveResponse._id,
                new ObjectId(params.apisRelacionadas[i])
              )
            }
          }
        }

        return {
          success: true,
          message: "Função criada com sucesso.",
          data: saveResponse
        }
      } else {
        const functionExist = await this._funcaoRepository.funcaoGetById({
          id: params._id
        })

        if (!functionExist)
          throw new Error("Função com o ID fornecido não encontrada.")

        const verifyRoot = await this._funcaoRepository.funcaoVerifyRoot(
          params.root,
          params._id
        )

        if (verifyRoot)
          throw new Error(
            "Já existe uma Função cadastrada com o Root fornecido."
          )

        const update = await this._funcaoRepository.funcaoUpdate(params)

        if (update > 0) {
          if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
            for (let i = 0; i < params.apisRelacionadas.length; i++) {
              await this._funcaoApiRepository.createRelation(
                params._id,
                new ObjectId(params.apisRelacionadas[i])
              )
            }
          }
        } else {
          throw new Error("Erro ao editar Função.")
        }

        return {
          success: true,
          message: "Função editada com sucesso."
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoGetById(id: funcaoIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._funcaoRepository.funcaoGetById(id)

      if (!repositoryResponse.data) throw new Error(repositoryResponse.message)

      return repositoryResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoDelete(id: funcaoIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._funcaoRepository.funcaoDelete(id)

      if (!repositoryResponse.success)
        throw new Error(repositoryResponse.message)

      return {
        success: true,
        message: "Função excluída com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
