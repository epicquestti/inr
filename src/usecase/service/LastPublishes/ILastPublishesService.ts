import { defaultResponse } from "@lib/types/defaultResponse"

export interface ILastPublishesService {
  getLastPublishes(): Promise<defaultResponse>
}
