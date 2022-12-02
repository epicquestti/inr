import { defaultResponse } from "@lib/types/defaultResponse"
import { atualizacaoListOutput } from "src/validation/Atualizacoes/atualizacaoList"
import { getAtualizacoesByIdOutput } from "src/validation/Atualizacoes/getAtualizacoesById"

export default interface IAtualizacoesService {
  getAtualizacoesById(
    params: getAtualizacoesByIdOutput
  ): Promise<defaultResponse>
  atualizacaoList(params: atualizacaoListOutput): Promise<defaultResponse>
}
