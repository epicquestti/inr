import { defaultResponse } from "@lib/types/defaultResponse"
import { noticiaIdInput } from "@validation/Noticia/noticiaId"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"

export default interface INoticiasController {
  noticiaSave(params: noticiaSaveInput): Promise<defaultResponse>
  noticiaGetById(params: noticiaIdInput): Promise<defaultResponse>
  noticiaDelete(params: noticiaIdInput): Promise<defaultResponse>
}
