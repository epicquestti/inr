import { schema, types } from "papr"
import papr from "../lib/backend/database"

const CursoSchema = schema({
  nome: types.string({ required: true, minLength: 2, maxLength: 1000 }),
  url: types.string({ required: true, minLength: 2, maxLength: 1000 }),
  active: types.boolean({ required: true }),
  destaque: types.boolean({ required: false })
})

const CursoModel = papr.model("Curso", CursoSchema)
export type CursoDocument = typeof CursoSchema[0]
export default CursoModel
