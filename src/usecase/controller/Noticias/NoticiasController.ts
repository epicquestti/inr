import { defaultResponse } from "@lib/types/defaultResponse"
import NoticiasService from "@usecase/service/Noticias/NoticiasService"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"
import INoticiasController from "./INoticiasController"

export default class NoticiasController implements INoticiasController {
  constructor(private _noticiasService: NoticiasService) {}

  async noticiaSave(params: noticiaSaveInput): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
