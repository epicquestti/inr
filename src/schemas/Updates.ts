import { Document, model, Model, models, Schema } from "mongoose"

interface updatesInterface extends Document {
  version: number
  major: number
  minor: number
  severity: "normal" | "urgent"
  link: string
  vigent: boolean
}

const updatesSchema = new Schema({
  version: { type: Number, required: true },
  major: { type: Number, required: true },
  minor: { type: Number, required: true },
  severity: { type: String, required: true },
  link: { type: String, required: true },
  vigent: { type: Boolean, required: true }
})

const Updates: Model<updatesInterface> =
  models["Updates"] || model("Updates", updatesSchema)

export default Updates
