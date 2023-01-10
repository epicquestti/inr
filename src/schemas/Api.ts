import { schema, types } from "papr"
import { papr } from "../lib/backend"

const ApiSchema = schema({
  url: types.string({ required: true }),
  method: types.string({ required: true }),
  type: types.string({ required: true })
})

const ApiModel = papr.model("Api", ApiSchema)
export type ApiDocument = typeof ApiSchema[0]
export default ApiModel
