import { defaultResponse } from "@lib/types/defaultResponse"
import IPublicacaoService from "./IPublicacaoService"

export default class PublicacaoService implements IPublicacaoService {
  update(params: {
    id: string
    titulo: string
    tipo: { id: number; text: string }
    pubId: number
    conteudoList: string
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
