import { schema, types } from "papr"

const tipoUsuarioSchema = schema({
  text: types.string({ required: true })
})

const tipoUsuarioModel = papr.model("TipoUsuario", tipoUsuarioSchema)
export type tipoUsuarioDocument = typeof tipoUsuarioSchema[0]
export default tipoUsuarioModel
