import { schema, types } from "papr"

const UsuarioSchema = schema(
  {
    nome: types.string({ required: true }),
    email: types.string({ required: true }),
    senha: types.string({ required: true }),
    tipoUsuario: types.object({
      _id: types.objectId({ required: true }),
      text: types.string({ required: true })
    })
  },
  {
    timestamps: true
  }
)

const usuarioModel = papr.model("Usuario", UsuarioSchema)
export type usuarioDocument = typeof UsuarioSchema[0]
export default usuarioModel
