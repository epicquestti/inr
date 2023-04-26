import { schema, types } from "papr"
import { papr } from "../lib/backend"

const reportesLifeCicleSchema = schema({
  reporte: types.objectId({ required: true }),
  event: types.string({ required: true }),
  createdAt: types.date({ required: true }),
  observacoes: types.string({ required: true })
})

const reportesLifeCicleModel = papr.model(
  "ReportesLifeCicle",
  reportesLifeCicleSchema
)
export type ReportesLifeCicleDocument = typeof reportesLifeCicleSchema[0]
export default reportesLifeCicleModel
