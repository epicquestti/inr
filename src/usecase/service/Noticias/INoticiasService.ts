import { defaultResponse } from "@lib/types/defaultResponse"
import { noticiaIdOutput } from "@validation/Noticia/noticiaId"
import { noticiaSaveOutput } from "@validation/Noticia/noticiaSave"

export default interface INoticiasService {
  noticiaCreate(params: noticiaSaveOutput): Promise<defaultResponse>
  noticiaUpdate(params: noticiaSaveOutput): Promise<defaultResponse>
  noticiaGetById(params: noticiaIdOutput): Promise<defaultResponse>
  noticiaDelete(params: noticiaIdOutput): Promise<defaultResponse>
}
