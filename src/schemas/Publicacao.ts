import { Document, model, Model, models, Schema, Types } from "mongoose"

export interface IPublicacao extends Document {
  publicId: number
  title: string
  type: {
    id: number
    text: string
  }
  createdAt: Date
  aproved?: Boolean
  published?: Boolean
  createdBy?: Types.ObjectId
  updatedAt?: Date
  updatedBy?: Types.ObjectId
  aprovedAt?: Date
  aprovedBy?: Types.ObjectId
  publishedAt?: Date
  publishedBy?: Types.ObjectId
}

const PublicacaoSchema = new Schema({
  publicId: { type: Number, required: true },
  title: { type: String, required: true },
  type: {
    id: { type: Number, required: true },
    text: { type: String, required: true }
  },
  createdAt: { type: Date, required: true },
  aproved: { type: Boolean, required: false },
  published: { type: Boolean, required: false },
  createdBy: { type: Types.ObjectId, required: false },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: Types.ObjectId, required: false },
  aprovedAt: { type: Date, required: false },
  aprovedBy: { type: Types.ObjectId, required: false },
  publishedAt: { type: Date, required: false },
  publishedBy: { type: Types.ObjectId, required: false }
})

const PublicacaoModel: Model<IPublicacao> =
  models["Publicacao"] || model("Publicacao", PublicacaoSchema)

export default PublicacaoModel
