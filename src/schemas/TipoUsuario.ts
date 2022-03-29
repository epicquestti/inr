import { Document, model, Model, models, Schema } from "mongoose"
interface tipoUsuarioInterface extends Document {
  text: string
}

const tipoUsuarioSchema = new Schema({
  text: { type: String, required: true }
})

const tipoUsuario: Model<tipoUsuarioInterface> = models["TipoUsuario"] || model("TipoUsuario", tipoUsuarioSchema)
export default tipoUsuario
