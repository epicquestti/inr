import { schema, types } from "papr"
import { papr } from "../lib/backend"

const FuncoesSchema = schema({
  nome: types.string({ required: true, minLength: 3, maxLength: 100 }),
  label: types.string({ required: true, minLength: 3, maxLength: 30 }),
  location: types.string({ required: true, minLength: 3, maxLength: 16 }),
  root: types.string({ required: true, minLength: 3, maxLength: 200 }),
  icon: types.string({ required: false, minLength: 3, maxLength: 20 }),
  actions: types.array(types.string(), { required: true }),
  ativo: types.boolean({ required: true }),
  free: types.boolean({ required: true }),
  createdAt: types.date({ required: false }),
  createdBy: types.objectId({ required: false }),
  updatedAt: types.date({ required: false }),
  updatedBy: types.objectId({ required: false }),
  deletedAt: types.date({ required: false }),
  deletedBy: types.objectId({ required: false })
})

const funcoesModel = papr.model("Funcoes", FuncoesSchema)
export type funcoesDocument = typeof FuncoesSchema[0]
export default funcoesModel
