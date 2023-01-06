import { schema, types } from "papr"
import { papr } from "../lib/backend"

const FuncaoSchema = schema({
  nome: types.string({ required: true }),
  root: types.string({ required: true }),
  icone: types.string({ required: true }),
  nivel: types.string({ required: true }),
  tipo: types.string({ required: true }),
  tipoUsuarioAutorizado: types.array(types.objectId()),
  acoes: types.array(types.string({ required: true }))
})

const FuncaoModel = papr.model("Funcao", FuncaoSchema)
export type FuncaoDocument = typeof FuncaoSchema[0]
export default FuncaoModel
