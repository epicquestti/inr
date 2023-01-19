import { defaultResponse } from "@lib/types/defaultResponse"
import IFuncaoService from "@usecase/service/Funcao/IFuncaoService"
import { funcaoIdInput, funcaoIdSchema } from "@validation/Funcoes/funcaoId"
import {
  funcaoSaveInput,
  funcaoSaveSchema
} from "@validation/Funcoes/funcaoSave"
import IFuncaoController from "./IFuncaoController"

export default class FuncaoController implements IFuncaoController {
  constructor(private _funcaoService: IFuncaoService) {}

  async funcaoCreate(params: funcaoSaveInput): Promise<defaultResponse> {
    console.log("Controller", params)

    try {
      const validation = await funcaoSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._funcaoService.funcaoSave(
        validation.data
      )

      if (!serviceResponse.success) throw new Error(serviceResponse.message)

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoGetById(id: funcaoIdInput): Promise<defaultResponse> {
    try {
      const validation = await funcaoIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._funcaoService.funcaoGetById(
        validation.data
      )

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoDelete(id: funcaoIdInput): Promise<defaultResponse> {
    try {
      const validation = await funcaoIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._funcaoService.funcaoDelete(
        validation.data
      )

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
