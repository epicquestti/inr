import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioIdOutput } from "@validation/TipoUsuario/tipoUsuarioId"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"
import { ObjectId } from "mongodb"

export default interface ITipoUsuarioService {
  tipoUsuarioSave(params: tipoUsuarioSaveOutput): Promise<defaultResponse>
  tipoUsuarioDelete(id: ObjectId): Promise<defaultResponse>
  tipoUsuarioDeleteRelation(id: ObjectId): Promise<defaultResponse>
  tipoUsuarioGetbyId(id: tipoUsuarioIdOutput): Promise<defaultResponse>
}
