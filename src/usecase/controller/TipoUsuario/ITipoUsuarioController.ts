import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioIdInput } from "@validation/TipoUsuario/tipoUsuarioId"
import { tipoUsuarioSaveInput } from "@validation/TipoUsuario/tipoUsuarioSave"

export default interface ITipoUsuarioController {
  tipoUsuarioSave(params: tipoUsuarioSaveInput): Promise<defaultResponse>
  tipoUsuarioDelete(id: tipoUsuarioIdInput): Promise<defaultResponse>
  tipoUsuarioGetById(id: tipoUsuarioIdInput): Promise<defaultResponse>
  tipoUsuarioUpdate(params: tipoUsuarioSaveInput): Promise<defaultResponse>
}
