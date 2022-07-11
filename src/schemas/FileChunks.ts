import { Document, model, Model, models, Schema } from "mongoose"

export interface FileChunksInterface extends Document {
  FileId: string
  ETag: string
  PartNumber: number
}

const FileChunksSchema = new Schema({
  FileId: { type: String, required: true },
  ETag: { type: String, required: true },
  PartNumber: { type: Number, required: true }
})
const FileChunks: Model<FileChunksInterface> =
  models["FileChunks"] || model("FileChunks", FileChunksSchema)

export default FileChunks
