import { schema, types } from "papr"
import { papr } from "../lib/backend"

const UsuarioSchema = schema(
  {
    nome: types.string({ required: true }),
    email: types.string({ required: true }),
    senha: types.string({ required: true }),
    tipoUsuario: types.objectId({ required: true }),
    permissoes: types.array(
      types.object({
        _id: types.objectId({ required: true }),
        nome: types.string({ required: true }),
        icone: types.string({ required: true }),
        tipo: types.string({ required: true }),
        root: types.string({ required: true }),
        acoes: types.array(types.string({ required: true }))
      })
    )
  },
  {
    timestamps: true
  }
)

const usuarioModel = papr.model("Usuario", UsuarioSchema)
export type usuarioDocument = typeof UsuarioSchema[0]
export default usuarioModel
