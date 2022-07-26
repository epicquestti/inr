import { Document, model, Model, models, Schema, Types } from "mongoose"
interface reportesLifeCicleInterface extends Document {
  reporte: Types.ObjectId
  event: string
  createdAt: Date
  observacoes: string
}

const reportesLifeCicleSchema = new Schema({
  reporte: { type: Types.ObjectId, required: true },
  event: { type: String, required: true },
  createdAt: { type: Date, required: true },
  observacoes: { type: String, required: true }
})

const ReportesLifeCicle: Model<reportesLifeCicleInterface> =
  models["ReportesLifeCicle"] ||
  model("ReportesLifeCicle", reportesLifeCicleSchema)

export default ReportesLifeCicle
