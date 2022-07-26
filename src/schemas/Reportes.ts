import { Document, model, Model, models, Schema } from "mongoose"
interface reportesinterface extends Document {
  createdAt: Date
  type: string
  status: string
  os: string
  version: string
  appId: string
  lastBeReceived: number
  lastClassReceived: number
  notifyClassificador: boolean
  notifyBoletim: boolean
  tratamento: string
  nome: string
  email: string
  ddd: number
  fone: string
  contactWhats: boolean
  contactEmail: boolean
  contactLigacao: boolean
  contactNo: boolean
  descricao: string
}

const reportesSchema = new Schema({
  createdAt: { type: Date, required: true },
  type: { type: String, required: true, maxlength: 3 },
  status: { type: String, required: true },
  os: { type: String, required: false },
  version: { type: String, required: true },
  appId: { type: String, required: true },
  lastBeReceived: { type: Number, required: false },
  lastClassReceived: { type: Number, required: false },
  notifyClassificador: { type: Boolean, required: false },
  notifyBoletim: { type: Boolean, required: false },
  tratamento: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  ddd: { type: String, required: true, maxlength: 2 },
  fone: { type: String, required: true, maxlength: 14 },
  contactWhats: { type: Boolean, required: true },
  contactEmail: { type: Boolean, required: true },
  contactLigacao: { type: Boolean, required: true },
  contactNo: { type: Boolean, required: true },
  descricao: { type: String, required: true }
})

const Reportes: Model<reportesinterface> =
  models["Reportes"] || model("Reportes", reportesSchema)

export default Reportes
