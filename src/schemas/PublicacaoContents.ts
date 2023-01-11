import { schema, types } from "papr"
import { papr } from "../lib/backend"

const PublicacaoContentsSchema = schema({
  title: types.string({ required: true }),
  url: types.string({ required: false }),
  tipo: types.string({ required: true }),
  idBoletim: types.objectId({ required: true })
})

const PublicacaoContentsModel = papr.model(
  "PublicacaoContents",
  PublicacaoContentsSchema
)
export type PublicacaoContentsDocument = typeof PublicacaoContentsSchema[0]
export default PublicacaoContentsModel
