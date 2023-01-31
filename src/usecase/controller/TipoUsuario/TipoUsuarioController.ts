import { defaultResponse } from "@lib/types/defaultResponse"
import ITipoUsuarioService from "@usecase/service/TipoUsuario/ITipoUsuarioService"
import { tipoUsuarioIdSchema } from "@validation/TipoUsuario/tipoUsuarioId"
import {
  tipoUsuarioSaveInput,
  tipoUsuarioSaveSchema
} from "@validation/TipoUsuario/tipoUsuarioSave"
import ITipoUsuarioController from "./ITipoUsuarioController"

export default class TipoUsuarioController implements ITipoUsuarioController {
  constructor(private _tipoUsuarioService: ITipoUsuarioService) {}

  async tipoUsuarioSave(
    params: tipoUsuarioSaveInput
  ): Promise<defaultResponse> {
    try {
      console.log("Controller", params)

      const validation = await tipoUsuarioSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._tipoUsuarioService.tipoUsuarioSave(
        validation.data
      )

      console.log("Service", serviceResponse)

      return {
        success: true,
        message: "Tipo de Usuário criado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async tipoUsuarioDelete(id: string): Promise<defaultResponse> {
    try {
      const validation = await tipoUsuarioIdSchema.safeParseAsync(id)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const tipoUsuarioExists =
        await this._tipoUsuarioService.tipoUsuarioGetbyId(validation.data.id)

      if (!tipoUsuarioExists)
        throw new Error("Nenhum Tipo de Usuário encontrado com o ID fornecido.")

      const relationResponse =
        await this._tipoUsuarioService.tipoUsuarioDeleteRelation(
          validation.data.id
        )

      const serviceResponse = await this._tipoUsuarioService.tipoUsuarioDelete(
        validation.data.id
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
