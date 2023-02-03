import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioIdInput } from "@validation/TipoUsuario/tipoUsuarioId"
import { tipoUsuarioSaveInput } from "@validation/TipoUsuario/tipoUsuarioSave"

export default interface ITipoUsuarioController {
  tipoUsuarioSave(params: tipoUsuarioSaveInput): Promise<defaultResponse>
  tipoUsuarioDelete(id: string): Promise<defaultResponse>
  tipoUsuarioGetById(id: tipoUsuarioIdInput): Promise<defaultResponse>
}
