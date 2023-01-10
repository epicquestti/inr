import { defaultResponse } from "@lib/types/defaultResponse"
import { IApiService } from "@usecase/service/Api/IApiService"
import { saveApiSchema } from "@validation/Api/saveApi"
import { getById } from "@validation/common/getById"
import { IApiController } from "./IApiController"

export class ApiController implements IApiController {
  constructor(private _apiService: IApiService) {}

  async deleteApi(params: { id: string }): Promise<defaultResponse> {
    try {
      const validation = await getById.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._apiService.deleteApi({
        id: validation.data.id
      })

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getApiById(params: { id: string }): Promise<defaultResponse> {
    try {
      const validation = await getById.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._apiService.getApiById({
        id: validation.data.id
      })

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async saveApi(params: {
    _id?: string | null | undefined
    url: string
    metodo: string
    tipo: string
  }): Promise<defaultResponse> {
    try {
      const validation = await saveApiSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._apiService.saveApi(validation.data)

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
