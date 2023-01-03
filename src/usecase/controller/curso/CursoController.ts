import { defaultResponse } from "@lib/types/defaultResponse"
import ICursoService from "@usecase/service/Curso/ICursoService"
import { getById, getByIdInput } from "@validation/common/getById"
import {
  cursoCreateInput,
  cursosCreateSchema
} from "@validation/Cursos/cursoCreate"
import {
  cursoUpdateInput,
  cursoUpdateSchema
} from "@validation/Cursos/cursoUpdate"
import ICursoController from "./ICursoController"

export default class CursoController implements ICursoController {
  constructor(private _cursoService: ICursoService) {}

  async cursoCreate(params: cursoCreateInput): Promise<defaultResponse> {
    try {
      const zodValidation = await cursosCreateSchema.safeParseAsync(params)

      if (!zodValidation.success) {
        throw new Error(zodValidation.error.issues[0].message)
      }

      const serviceResponse = await this._cursoService.cursoCreate(
        zodValidation.data
      )

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoUpdate(params: cursoUpdateInput): Promise<defaultResponse> {
    try {
      const zodValidation = await cursoUpdateSchema.safeParseAsync(params)

      if (!zodValidation.success) {
        throw new Error(zodValidation.error.issues[0].message)
      }

      const serviceResponse = await this._cursoService.cursoUpdate(
        zodValidation.data
      )

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoGetById(params: getByIdInput): Promise<defaultResponse> {
    try {
      const zodValidation = await getById.safeParseAsync(params)

      if (!zodValidation.success) {
        throw new Error(zodValidation.error.issues[0].message)
      }

      const serviceResponse = await this._cursoService.cursoGetById(
        zodValidation.data
      )

      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoDelete(params: getByIdInput): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
