import { defaultResponse } from "@lib/types/defaultResponse"
import ICursoService from "@usecase/service/Curso/ICursoService"
import { getById } from "@validation/common/getById"
import {
  cursoCreateInput,
  cursosCreateSchema
} from "@validation/Cursos/cursoCreate"
import { cursoIdInput } from "@validation/Cursos/cursoId"
import {
  cursoUpdateInput,
  cursoUpdateSchema
} from "@validation/Cursos/cursoUpdate"
import { ObjectId } from "mongodb"
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

  async cursoGetById(params: cursoIdInput): Promise<defaultResponse> {
    try {
      const zodValidation = await getById.safeParseAsync(params)

      if (!zodValidation.success) {
        throw new Error(zodValidation.error.issues[0].message)
      }

      const objId = new ObjectId(zodValidation.data.id)

      const serviceResponse = await this._cursoService.cursoGetById({
        id: objId
      })
      return serviceResponse
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoDelete(params: cursoIdInput): Promise<defaultResponse> {
    try {
      const zodValidation = await getById.safeParseAsync(params.id)

      if (!zodValidation.success) {
        throw new Error(zodValidation.error.issues[0].message)
      }

      const objId = new ObjectId(zodValidation.data.id)

      const serviceResponse = await this._cursoService.cursoDelete({
        id: objId
      })

      return serviceResponse
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
