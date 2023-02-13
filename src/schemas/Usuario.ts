import { schema, types } from "papr"
import { papr } from "../lib/backend"

const UsuarioSchema = schema(
  {
    email: types.string({ required: true }),
    senha: types.string({ required: true }),
    tipoUsuario: types.objectId({ required: true })
  },
  {
    timestamps: true
  }
)

const usuarioModel = papr.model("Usuario", UsuarioSchema)
export type usuarioDocument = typeof UsuarioSchema[0]
export default usuarioModel
