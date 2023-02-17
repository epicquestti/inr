import { defaultResponse } from "@lib/types/defaultResponse"
import SalaTematicaService from "@usecase/service/SalaTematica/SalaTematicaService"
import { salaTematicaIdInput } from "@validation/SalaTematica/salaTematicaId"
import {
  salaTematicaSaveInput,
  salaTematicaSaveSchema
} from "@validation/SalaTematica/salaTematicaSave"
import { subSalaTematicaIdSchema } from "@validation/SubSalaTematica/subSalaTematicaId"
import ISalaTematicaController from "./ISalaTematicaController"

export default class SalaTematicaController implements ISalaTematicaController {
  constructor(private _salaTematicaService: SalaTematicaService) {}
  async salaTematicaSave(
    params: salaTematicaSaveInput
  ): Promise<defaultResponse> {
    try {
      const validation = await salaTematicaSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._salaTematicaService.salaTematicaSave(
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

  async salaTematicaGetById(id: salaTematicaIdInput): Promise<defaultResponse> {
    try {
      const validation = await subSalaTematicaIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse =
        await this._salaTematicaService.salaTematicaGetById(validation.data)

      if (!serviceResponse.success) throw new Error(serviceResponse.message)

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  salaTematicaDelete(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

  salaTematicaGetByNome(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
