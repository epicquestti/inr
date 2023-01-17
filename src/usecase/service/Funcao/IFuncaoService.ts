import { defaultResponse } from "@lib/types/defaultResponse"
import { funcaoIdOutput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"

export default interface IFuncaoService {
  funcaoSave(params: funcaoSaveOutput): Promise<defaultResponse>
  funcaoGetById(id: funcaoIdOutput): Promise<defaultResponse>
  funcaoDelete(id: funcaoIdOutput): Promise<defaultResponse>
}
