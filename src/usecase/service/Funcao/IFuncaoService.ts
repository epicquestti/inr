import { defaultResponse } from "@lib/types/defaultResponse"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"

export default interface IFuncaoService {
  funcaoSave(params: funcaoSaveOutput): Promise<defaultResponse>
}
