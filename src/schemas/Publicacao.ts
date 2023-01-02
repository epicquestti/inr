import { schema, types } from "papr"

const PublicacaoSchema = schema({
  publicId: types.number({ required: true }),
  title: types.string({ required: true }),
  type: types.object({
    id: types.number({ required: true }),
    text: types.string({ required: true })
  }),
  createdAt: types.date({ required: true }),
  aproved: types.boolean({ required: false }),
  published: types.boolean({ required: false }),
  createdBy: types.objectId({ required: false }),
  updatedAt: types.date({ required: false }),
  updatedBy: types.objectId({ required: false }),
  aprovedAt: types.date({ required: false }),
  aprovedBy: types.objectId({ required: false }),
  publishedAt: types.date({ required: false }),
  publishedBy: types.objectId({ required: false })
})

const PublicacaoModel = papr.model("Publicacao", PublicacaoSchema)
export type PublicacaoDocument = typeof PublicacaoSchema[0]
export default PublicacaoModel
