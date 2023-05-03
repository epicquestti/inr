import { defaultResponse } from "@lib/types/defaultResponse"
import { newFuncaoService } from "@validation/Funcao/newFuncao"

export default interface FuncoesServices {
  newFuncao(params: newFuncaoService): Promise<defaultResponse>
}
