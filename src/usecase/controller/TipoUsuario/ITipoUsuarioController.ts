import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioSaveInput } from "@validation/TipoUsuario/tipoUsuarioSave"

export default interface ITipoUsuarioController {
  tipoUsuarioSave(params: tipoUsuarioSaveInput): Promise<defaultResponse>
}
