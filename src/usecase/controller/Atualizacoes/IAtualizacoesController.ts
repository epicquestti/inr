import { defaultResponse } from "@lib/types/defaultResponse"
import { getByIdInput } from "@validation/common/getById"
import { getAtualizacoesByIdInput } from "src/validation/Atualizacoes/getAtualizacoesById"

export interface IAtualizacoesController {
  getAtualizacoesById(
    params: getAtualizacoesByIdInput
  ): Promise<defaultResponse>
  atualizacaoList(params: any): Promise<defaultResponse>
  publicar(params: getByIdInput): Promise<defaultResponse>
}
