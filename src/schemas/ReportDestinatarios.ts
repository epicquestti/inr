import { Document, model, Model, models, Schema } from "mongoose"
interface reportDestinatarioInterface extends Document {
  nome: string
  email: string
}

const reportDestinatarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true }
})

const ReportDestinatario: Model<reportDestinatarioInterface> =
  models["ReportDestinatario"] ||
  model("ReportDestinatario", reportDestinatarioSchema)

export default ReportDestinatario
