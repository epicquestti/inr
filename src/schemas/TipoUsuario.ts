import { schema, types } from "papr"
import { papr } from "../lib/backend"

const tipoUsuarioSchema = schema({
  text: types.string({ required: true }),
  super: types.boolean({ required: true }),
  allowedFunctions: types.array(
    types.object({
      _id: types.objectId({ required: true }),
      nome: types.string({ required: true })
    }),
    { required: false }
  )
})

const tipoUsuarioModel = papr.model("TipoUsuario", tipoUsuarioSchema)
export type tipoUsuarioDocument = typeof tipoUsuarioSchema[0]
export default tipoUsuarioModel
