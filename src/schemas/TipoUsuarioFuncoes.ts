import { schema, types } from "papr"

const tipoUsuarioFuncoesSchema = schema({
  tipoUsuarioId: types.objectId({ required: true }),
  funcaoId: types.objectId({ required: true })
})

const TipoUsuarioFuncoesModel = papr.model(
  "TipoUsuarioFuncoes",
  tipoUsuarioFuncoesSchema
)
export type TipoUsuarioFuncoesDocument = typeof tipoUsuarioFuncoesSchema[0]

export default TipoUsuarioFuncoesModel
