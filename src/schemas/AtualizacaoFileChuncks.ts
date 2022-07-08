import { Document, model, Model, models, Schema, Types } from "mongoose"

export interface AtualizacaoFileChunckInterface extends Document {
  fileIdent: Types.ObjectId
  AtualizacaoFileId: string
  ETag: string
}

const AtualizacaoFileChunckSchema = new Schema({
  fileId: { type: String, required: true },
  fileKey: { type: String, required: true },
  state: { type: Types.ObjectId, required: true }
})
const AtualizacaoFileChunck: Model<AtualizacaoFileChunckInterface> =
  models["AtualizacaoFileChunck"] ||
  model("AtualizacaoFileChunck", AtualizacaoFileChunck)

export default AtualizacaoFileChunck
