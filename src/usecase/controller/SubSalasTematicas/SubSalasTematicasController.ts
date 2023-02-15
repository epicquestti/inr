import { defaultResponse } from "@lib/types/defaultResponse"
import ISubSalasTematicasService from "@usecase/service/SubSalasTematicas/ISubSalasTematicasService"
import {
  subSalaTematicaIdInput,
  subSalaTematicaIdSchema
} from "@validation/SubSalaTematica/subSalaTematicaId"
import {
  subSalaTematicaSaveInput,
  subSalaTematicaSaveSchema
} from "@validation/SubSalaTematica/subSalaTematicaSave"
import ISubSalasTematicasController from "./ISubSalasTematicasController"

export default class SubSalasTematicasController
  implements ISubSalasTematicasController
{
  constructor(private _subSalasTematicasService: ISubSalasTematicasService) {}

  async subSalaTematicaSave(
    params: subSalaTematicaSaveInput
  ): Promise<defaultResponse> {
    try {
      const validation = await subSalaTematicaSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse =
        await this._subSalasTematicasService.subSalaTematicaSave(
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

  async subSalaTematicaGetById(
    id: subSalaTematicaIdInput
  ): Promise<defaultResponse> {
    try {
      const validation = await subSalaTematicaIdSchema.safeParseAsync(id)

      if (!validation.success) {
        throw new Error(validation.error.issues[0].message)
      }

      const serviceResponse =
        await this._subSalasTematicasService.subSalaTematicaGetById(
          validation.data
        )

      console.log("serviceResponse", serviceResponse)

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async subSalaTematicaDelete(
    id: subSalaTematicaIdInput
  ): Promise<defaultResponse> {
    try {
      const validation = await subSalaTematicaIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const subSalaTematicaExists =
        await this._subSalasTematicasService.subSalaTematicaGetById(
          validation.data
        )

      if (!subSalaTematicaExists)
        throw new Error("Nenhum Tipo de Usuário encontrado com o ID fornecido.")

      const serviceResponse =
        await this._subSalasTematicasService.subSalaTematicaDelete(
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
}
