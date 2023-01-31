import { defaultResponse } from "@lib/types/defaultResponse"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"
import { ObjectId } from "mongodb"

export default interface ITipoUsuarioService {
  tipoUsuarioSave(params: tipoUsuarioSaveOutput): Promise<defaultResponse>
  tipoUsuarioDelete(id: ObjectId): Promise<defaultResponse>
  tipoUsuarioDeleteRelation(id: ObjectId): Promise<defaultResponse>
  tipoUsuarioGetbyId(id: ObjectId): Promise<defaultResponse>
}
