import { schema, types } from "papr"
import papr from "../lib/backend/database"

const reportesLifeCicleSchema = schema({
  reporte: types.objectId({ required: true }),
  event: types.string({ required: true }),
  createdAt: types.date({ required: true }),
  observacoes: types.string({ required: false })
})

const reportesLifeCicleModel = papr.model(
  "ReportesLifeCicle",
  reportesLifeCicleSchema
)
export type ReportesLifeCicleDocument = typeof reportesLifeCicleSchema[0]
export default reportesLifeCicleModel
