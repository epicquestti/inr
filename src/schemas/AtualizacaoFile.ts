import { Document, model, Model, models, Schema } from "mongoose"

export interface AtualizacaoFileInterface extends Document {
  fileId: string
  fileKey: string
  state: string
}

const AtualizacaoFileSchema = new Schema({
  fileId: { type: String, required: true },
  fileKey: { type: String, required: true },
  state: { type: String, required: true }
})
const AtualizacaoFile: Model<AtualizacaoFileInterface> =
  models["AtualizacaoFile"] || model("AtualizacaoFile", AtualizacaoFileSchema)

export default AtualizacaoFile
