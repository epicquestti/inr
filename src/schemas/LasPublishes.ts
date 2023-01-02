import { schema, types } from "papr"
import { papr } from "../lib/backend"

const lastPublishesSchema = schema({
  boletim: types.number({ required: false }),
  classificador: types.number({ required: false })
})

const LastPublishesModel = papr.model("LastPublishes", lastPublishesSchema)
export type LastPublishesDocument = typeof lastPublishesSchema[0]
export default LastPublishesModel
