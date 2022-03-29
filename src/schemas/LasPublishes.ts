import { Document, model, Model, models, Schema } from "mongoose"
interface lastPublishesInterface extends Document {
  boletim: number
  classificador: number
}

const lastPublishesSchema = new Schema({
  boletim: { type: Number, required: false },
  classificador: { type: Number, required: false }
})

const LastPublishes: Model<lastPublishesInterface> = models["LastPublishes"] || model(
  "LastPublishes",
  lastPublishesSchema
)

export default LastPublishes
