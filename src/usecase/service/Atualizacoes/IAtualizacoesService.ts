import { defaultResponse } from "@lib/types/defaultResponse"
import { getAtualizacoesByIdOutput } from "src/validation/Atualizacoes/getAtualizacoesById"

export default interface IAtualizacoesService {
  getAtualizacoesById(
    params: getAtualizacoesByIdOutput
  ): Promise<defaultResponse>
}
