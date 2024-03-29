import { schema, types } from "papr"
import { papr } from "../lib/backend"

const reportDestinatarioSchema = schema({
  nome: types.string({ required: true }),
  email: types.string({ required: true })
})

const publicIdentifierModel = papr.model(
  "ReportDestinatario",
  reportDestinatarioSchema
)
export type publicIdentifierDocument = typeof reportDestinatarioSchema[0]
export default publicIdentifierModel
