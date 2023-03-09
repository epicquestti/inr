import { defaultResponse } from "@lib/types/defaultResponse"
import NoticiasService from "@usecase/service/Noticias/NoticiasService"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"
import INoticiasController from "./INoticiasController"

export default class NoticiasController implements INoticiasController {
  constructor(private _noticiasService: NoticiasService) {}
  async noticiaGetById(params: { id: string }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  async noticiaDelete(params: { id: string }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

  async noticiaSave(params: noticiaSaveInput): Promise<defaultResponse> {
    console.log("controller", params)
    return {
      success: true,
      message: ""
    }
  }
}
