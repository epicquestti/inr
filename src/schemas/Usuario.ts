import { Document, model, Model, models, Schema, Types } from "mongoose"

export interface UsuarioInterface extends Document {
  nome: string
  email: string
  senha: string
  tipoUsuario: Types.ObjectId
  ativo: boolean
  firstUsage: boolean
}

const UsuarioSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    tipoUsuario: { type: Schema.Types.ObjectId, ref: "TipoUsuario" }
  },
  {
    timestamps: true
  }
)
const usuario: Model<UsuarioInterface> = models["Usuario"] || model("Usuario", UsuarioSchema)

export default usuario
