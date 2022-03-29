import { Document, model, Model, models, Schema } from "mongoose"
interface publicIdentifiersInterface extends Document {
  boletim: number
  classificador: number
}

const publicIdentifiersSchema = new Schema({
  boletim: { type: Number, required: false },
  classificador: { type: Number, required: false }
})

const PublicIdentifierModel: Model<publicIdentifiersInterface> = models["PublicIdentifier"] || model(
  "PublicIdentifier",
  publicIdentifiersSchema
)

export default PublicIdentifierModel
