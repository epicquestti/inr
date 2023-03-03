import { defaultResponse } from "@lib/types/defaultResponse"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"

export default interface INoticiasController {
  noticiaSave(params: noticiaSaveInput): Promise<defaultResponse>
}
