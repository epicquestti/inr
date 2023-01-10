import { defaultResponse } from "@lib/types/defaultResponse"

export default interface ILastPublishesController {
  getLastPublishes(): Promise<defaultResponse>
}
