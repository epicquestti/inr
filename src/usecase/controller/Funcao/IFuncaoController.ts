import { defaultResponse } from "@lib/types/defaultResponse"
import { funcaoSaveInput } from "@validation/Funcoes/funcaoSave"

export default interface IFuncaoController {
  funcaoCreate(params: funcaoSaveInput): Promise<defaultResponse>
}
