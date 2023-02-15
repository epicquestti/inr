import { schema, types } from "papr"
import { papr } from "../lib/backend"

const SubSalasTematicasSchema = schema({
  nome: types.string({ required: true })
})

const subSalasTematicasModel = papr.model(
  "SubSalasTematicas",
  SubSalasTematicasSchema
)
export type subSalasTematicasDocument = typeof SubSalasTematicasSchema[0]
export default subSalasTematicasModel
