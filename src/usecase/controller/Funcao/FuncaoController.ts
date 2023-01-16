import { defaultResponse } from "@lib/types/defaultResponse"
import IFuncaoService from "@usecase/service/Funcao/IFuncaoService"
import {
  funcaoSaveInput,
  funcaoSaveSchema
} from "@validation/Funcoes/funcaoSave"
import IFuncaoController from "./IFuncaoController"

export default class FuncaoController implements IFuncaoController {
  constructor(private _funcaoService: IFuncaoService) {}

  async funcaoCreate(params: funcaoSaveInput): Promise<defaultResponse> {
    const validation = await funcaoSaveSchema.safeParseAsync(params)

    if (!validation.success) throw new Error(validation.error.issues[0].message)

    const serviceResponse = await this._funcaoService.funcaoSave(
      validation.data
    )

    if (!serviceResponse.success) throw new Error(serviceResponse.message)

    return serviceResponse
  }
}
