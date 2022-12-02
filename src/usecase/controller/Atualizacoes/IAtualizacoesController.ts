import { defaultResponse } from "@lib/types/defaultResponse"
import { getAtualizacoesByIdInput } from "src/validation/Atualizacoes/getAtualizacoesById"

export interface IAtualizacoesController {
  getAtualizacoesById(
    params: getAtualizacoesByIdInput
  ): Promise<defaultResponse>
}
