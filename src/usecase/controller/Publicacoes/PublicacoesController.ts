import { defaultResponse } from "@lib/types/defaultResponse"
import IPublicacoesController from "./IPublicacoesController"

export default class PublicacoesController implements IPublicacoesController {
  update(params: {
    id: string
    titulo: string
    tipo: string
    pubId: string
    conteudoList: { [x: string]: any }[]
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
