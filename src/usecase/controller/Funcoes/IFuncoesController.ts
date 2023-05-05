import { defaultResponse } from "@lib/types/defaultResponse"
import { newFuncaoController } from "@validation/Funcao/newFuncao"

export default interface IFuncoesControler {
  deleteFuncao(): Promise<defaultResponse>
  updateFuncao(): Promise<defaultResponse>
  getFuncaoById(): Promise<defaultResponse>
  searchFuncao(): Promise<defaultResponse>
  stateFuncao(): Promise<defaultResponse>
  listStateFuncao(): Promise<defaultResponse>
  listDeleteFuncao(): Promise<defaultResponse>
  newFuncao(params: newFuncaoController): Promise<defaultResponse>
}
