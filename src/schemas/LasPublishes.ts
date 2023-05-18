import { schema, types } from "papr"
import papr from "../lib/backend/database"

const lastPublishesSchema = schema({
  boletim: types.number({ required: false }),
  classificador: types.number({ required: false })
})

const LastPublishes = papr.model("LastPublishes", lastPublishesSchema)
export type LastPublishesDocument = typeof lastPublishesSchema[0]
export default LastPublishes
