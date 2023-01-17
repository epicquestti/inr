import { defaultResponse } from "@lib/types/defaultResponse"
import { salvarAtualizacao } from "@validation/Atualizacoes/salvarAtualizacao"
import { getById } from "@validation/common/getById"
import IAtualizacoesService from "src/usecase/service/Atualizacoes/IAtualizacoesService"
import {
  atualizacaoListInput,
  atualizacaoListSchema
} from "src/validation/Atualizacoes/atualizacaoList"
import {
  getAtualizacoesById,
  getAtualizacoesByIdInput
} from "src/validation/Atualizacoes/getAtualizacoesById"
import { IAtualizacoesController } from "./IAtualizacoesController"

export default class AtualizacoesController implements IAtualizacoesController {
  constructor(private _AtualizacaoService: IAtualizacoesService) {}

  async salvarAtualizacao(params: {
    id: string
    version: string
    major: string
    minor: string
    severity: string
    link: string
  }): Promise<defaultResponse> {
    try {
      const validation = await salvarAtualizacao.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._AtualizacaoService.salvarAtualizacao(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }

  async publicar(params: { id: string }): Promise<defaultResponse> {
    try {
      const validation = await getById.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._AtualizacaoService.publish(validation.data)

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

  async getAtualizacoesById(
    params: getAtualizacoesByIdInput
  ): Promise<defaultResponse> {
    try {
      const validation = await getAtualizacoesById.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._AtualizacaoService.getAtualizacoesById(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }

  async atualizacaoList(
    params: atualizacaoListInput
  ): Promise<defaultResponse> {
    try {
      const validation = await atualizacaoListSchema.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._AtualizacaoService.atualizacaoList(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      console.log(service)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
