import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"

export default interface ITipoUsuarioService {
  tipoUsuarioSave(params: tipoUsuarioSaveOutput): Promise<defaultResponse>
}
