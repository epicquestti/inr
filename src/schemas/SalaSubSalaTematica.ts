import { schema, types } from "papr"
import { papr } from "../lib/backend"

const SalaSubSalaTematicaSchema = schema({
  salaTematicaId: types.objectId({ required: true }),
  subSalaTematicaId: types.objectId({ required: true })
})

const salaSubSalaTematicaModel = papr.model(
  "SalaSubSalaTematica",
  SalaSubSalaTematicaSchema
)

export type salaSubSalaTematicaDocument = typeof SalaSubSalaTematicaSchema[0]
export default salaSubSalaTematicaModel
