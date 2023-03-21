import { schema, types } from "papr"
import { papr } from "../lib/backend"

const AutorSchema = schema({
  nome: types.string({ required: true }),
  foto: types.string({ required: false }),
  curriculo: types.string({ required: true })
})

const autorModel = papr.model("Autor", AutorSchema)

export type autorDocument = typeof AutorSchema[0]
export default autorModel
