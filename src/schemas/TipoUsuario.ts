import { schema, types } from "papr"
import { papr } from "../lib/backend"

const tipoUsuarioSchema = schema({
  nome: types.string({ required: true }),
  super: types.boolean({ required: true })
})

const tipoUsuarioModel = papr.model("TipoUsuario", tipoUsuarioSchema)
export type tipoUsuarioDocument = typeof tipoUsuarioSchema[0]
export default tipoUsuarioModel
