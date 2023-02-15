import { schema, types } from "papr"
import { papr } from "../lib/backend"

const SalaTematicaSchema = schema({
  nome: types.string({ required: true })
})

const salaTematicaModel = papr.model("SalaTematica", SalaTematicaSchema)

export type salaTematicaDocument = typeof SalaTematicaSchema[0]
export default salaTematicaModel
