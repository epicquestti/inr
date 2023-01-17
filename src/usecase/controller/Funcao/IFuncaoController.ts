import { defaultResponse } from "@lib/types/defaultResponse"
import { funcaoIdInput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveInput } from "@validation/Funcoes/funcaoSave"

export default interface IFuncaoController {
  funcaoCreate(params: funcaoSaveInput): Promise<defaultResponse>
  funcaoGetById(id: funcaoIdInput): Promise<defaultResponse>
  funcaoDelete(id: funcaoIdInput): Promise<defaultResponse>
}
