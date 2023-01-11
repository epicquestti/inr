import { schema, types } from "papr"
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
  contactEmail: boolean
  contactLigacao: boolean
  contactNo: boolean
  descricao: string
}

const reportesSchema = schema({
  createdAt: types.date({ required: true }),
  type: types.string({ required: true, maxLength: 3 }),
  status: types.string({ required: true }),
  os: types.string({ required: false }),
  version: types.string({ required: true }),
  appId: types.string({ required: true }),
  lastBeReceived: types.number({ required: false }),
  lastClassReceived: types.number({ required: false }),
  notifyClassificador: types.boolean({ required: false }),
  notifyBoletim: types.boolean({ required: false }),
  tratamento: types.string({ required: true }),
  nome: types.string({ required: true }),
  email: types.string({ required: true }),
  ddd: types.string({ required: true, maxLength: 2 }),
  fone: types.string({ required: true, maxLength: 14 }),
  contactEmail: types.boolean({ required: true }),
  contactLigacao: types.boolean({ required: true }),
  contactNo: types.boolean({ required: true }),
  descricao: types.string({ required: true })
})

const reportesModel = papr.model("Reportes", reportesSchema)
export type reportesDocument = typeof reportesSchema[0]
export default reportesModel
