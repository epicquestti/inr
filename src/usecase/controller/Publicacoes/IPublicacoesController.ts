import { defaultResponse } from "@lib/types/defaultResponse"
import { updatePublicacaoInput } from "@validation/Publicacao/update"

export default interface IPublicacoesController {
  update(params: updatePublicacaoInput): Promise<defaultResponse>
}
