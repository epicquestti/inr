import { defaultResponse } from "@lib/types/defaultResponse"
import IPublicacaoService from "@usecase/service/Publicacoes/IPublicacaoService"
import { updatePublicacao } from "@validation/Publicacao/update"
import IPublicacoesController from "./IPublicacoesController"

export default class PublicacoesController implements IPublicacoesController {
  constructor(private _publicacaoService: IPublicacaoService) {}
  async update(params: {
    _id: string
    titulo: string
    tipo: string
    pubId: string
    conteudoList: {
      tipo: string
      title: string
      url: string
      idBoletim: string
    }[]
  }): Promise<defaultResponse> {
    try {
      const validation = await updatePublicacao.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._publicacaoService.update(validation.data)

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
}
