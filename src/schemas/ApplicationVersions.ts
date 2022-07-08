import { Document, model, Model, models, Schema } from "mongoose"
export interface applicationVersions extends Document {
  version: number
  major: number
  minor: number
  severity: "normal" | "urgent"
  link: string
  vigent: boolean
}

const applicationVersionsSchema = new Schema({
  version: { type: Number, required: true },
  major: { type: Number, required: true },
  minor: { type: Number, required: true },
  severity: { type: String, required: true },
  link: { type: String, required: true },
  vigent: { type: Boolean, required: true }
})

const ApplicationVersions: Model<applicationVersions> =
  models["ApplicationVersions"] ||
  model("ApplicationVersions", applicationVersionsSchema)

export default ApplicationVersions
