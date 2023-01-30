import { defaultResponse } from "@lib/types/defaultResponse"
import ITipoUsuarioService from "@usecase/service/TipoUsuario/ITipoUsuarioService"
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
}
