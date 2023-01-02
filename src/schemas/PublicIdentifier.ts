import { schema, types } from "papr"

const publicIdentifierSchema = schema({
  boletim: types.number({ required: false }),
  classificador: types.number({ required: false })
})

const publicIdentifierModel = papr.model(
  "PublicIdentifier",
  publicIdentifierSchema
)
export type publicIdentifierDocument = typeof publicIdentifierSchema[0]
export default publicIdentifierModel
