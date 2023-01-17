import { defaultResponse } from "@lib/types/defaultResponse"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import { funcaoIdOutput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"
import IFuncaoService from "./IFuncaoService"

export default class FuncaoService implements IFuncaoService {
  constructor(private _funcaoRepository: FuncaoRepository) {}

  async funcaoSave(params: funcaoSaveOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._funcaoRepository.funcaoSave(params)

      if (!repositoryResponse.data) throw new Error(repositoryResponse.message)

      return {
        success: true,
        message: "Função criada com sucesso."
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
