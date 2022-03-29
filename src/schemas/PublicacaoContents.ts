import { Document, model, Model, models, Schema, Types } from "mongoose"

export interface IPublicacaoContents extends Document {
  title: string
  url: string
  tipo: string
  idBoletim: Types.ObjectId
}

const PublicacaoContentsSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  tipo: { type: String, required: true },
  idBoletim: { type: Types.ObjectId, required: true }
})

const PublicacaoContentsModel: Model<IPublicacaoContents> = models["PublicacaoContents"] || model("PublicacaoContents", PublicacaoContentsSchema)

export default PublicacaoContentsModel 
