import { defaultResponse } from "@lib/types/defaultResponse"
import { updatePublicacaoOutput } from "@validation/Publicacao/update"

export default interface IPublicacaoService {
  update(params: updatePublicacaoOutput): Promise<defaultResponse>
}
