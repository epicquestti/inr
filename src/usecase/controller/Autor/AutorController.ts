import { defaultResponse } from "@lib/types/defaultResponse"
import IAutorService from "@usecase/service/Autor/IAutorService"
import { autorIdInput, autorIdSchema } from "@validation/Autor/autorId"
import { autorSaveInput, autorSaveSchema } from "@validation/Autor/autorSave"
import IAutorController from "./IAutorController"

export default class AutorController implements IAutorController {
  constructor(private _autorService: IAutorService) {}

  async autorSave(params: autorSaveInput): Promise<defaultResponse> {
    try {
      const validation = await autorSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._autorService.autorSave(
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

  async autorGetById(params: autorIdInput): Promise<defaultResponse> {
    console.log("Controller", params)
    try {
      const validation = await autorIdSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._autorService.autorGetById(
        validation.data._id
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

  async autorDelete(id: autorIdInput): Promise<defaultResponse> {
    try {
      const validation = await autorIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._autorService.autorDelete(
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
