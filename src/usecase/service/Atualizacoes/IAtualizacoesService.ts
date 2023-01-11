import { defaultResponse } from "@lib/types/defaultResponse"
import { atualizacaoListOutput } from "@validation/Atualizacoes/atualizacaoList"
import { getAtualizacoesByIdOutput } from "@validation/Atualizacoes/getAtualizacoesById"
import { salvarAtualizacaoOutput } from "@validation/Atualizacoes/salvarAtualizacao"
import { getByIdOutput } from "@validation/common/getById"

export default interface IAtualizacoesService {
  getAtualizacoesById(
    params: getAtualizacoesByIdOutput
  ): Promise<defaultResponse>
  atualizacaoList(params: atualizacaoListOutput): Promise<defaultResponse>
  publish(params: getByIdOutput): Promise<defaultResponse>
  salvarAtualizacao(params: salvarAtualizacaoOutput): Promise<defaultResponse>
}
