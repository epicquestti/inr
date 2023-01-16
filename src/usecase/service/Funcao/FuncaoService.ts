import { defaultResponse } from "@lib/types/defaultResponse"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
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
}
