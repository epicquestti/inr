import { defaultResponse } from "@lib/types/defaultResponse"
import IUsuarioService from "@usecase/service/Usuario/IUsuarioService"
import { authenticationPanel } from "@validation/Usuario/authenticationPanel"
import { authenticationPanelContingencySchema } from "@validation/Usuario/authenticationPanelContingency"
import { usuarioIdInput, usuarioIdSchema } from "@validation/Usuario/usuarioId"
import {
  usuarioSaveInput,
  usuarioSaveSchema
} from "@validation/Usuario/usuarioSave"

import IUsuarioController from "./IUsuarioController"

export default class UsuarioController implements IUsuarioController {
  constructor(private _usuarioService: IUsuarioService) {}
  async authenticationPanelContingency(params: {
    credential: string
  }): Promise<defaultResponse> {
    try {
      const validation =
        await authenticationPanelContingencySchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._usuarioService.authenticationPanelContingency(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      return service
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  async authenticationPanel(params: {
    email: string
    senha: string
    keepConnected: string
  }): Promise<defaultResponse> {
    try {
      const validation = await authenticationPanel.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._usuarioService.authenticationPanel(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      return service
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async usuarioSave(params: usuarioSaveInput): Promise<defaultResponse> {
    try {
      const validation = await usuarioSaveSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const serviceResponse = await this._usuarioService.usuarioSave(
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

  async usuarioGetById(id: usuarioIdInput): Promise<defaultResponse> {
    try {
      const validation = await usuarioIdSchema.safeParseAsync(id)

      if (!validation.success) {
        throw new Error(validation.error.issues[0].message)
      }

      const serviceResponse = await this._usuarioService.usuarioGetById(
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
