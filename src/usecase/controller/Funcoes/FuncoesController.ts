import { defaultResponse } from "@lib/types/defaultResponse"
import IFuncoesControler from "./IFuncoesController"

export default class FuncoesControler implements IFuncoesControler {
  deleteFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  updateFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  getFuncaoById(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  searchFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  stateFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  listStateFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  listDeleteFuncao(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  newFuncao(params: {
    nome: string
    label: string
    posicao: string
    root: string
    icone: string
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
