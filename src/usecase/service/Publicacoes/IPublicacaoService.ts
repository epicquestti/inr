import { defaultResponse } from "@lib/types/defaultResponse"
import { getByIdOutput } from "@validation/common/getById"
import { updatePublicacaoOutput } from "@validation/Publicacao/update"

export default interface IPublicacaoService {
  update(params: updatePublicacaoOutput): Promise<defaultResponse>
  publish(params: getByIdOutput): Promise<defaultResponse>
}
