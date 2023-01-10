import { schema, types } from "papr"
import { papr } from "../lib/backend"

const FuncaoApiSchema = schema({
  funcao: types.objectId({ required: true }),
  api: types.objectId({ required: true })
})

const FuncaoApiModel = papr.model("FuncaoApi", FuncaoApiSchema)
export type FuncaoApiDocument = typeof FuncaoApiSchema[0]
export default FuncaoApiModel
