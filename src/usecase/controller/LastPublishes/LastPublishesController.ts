import { defaultResponse } from "@lib/types/defaultResponse"
import { ILastPublishesService } from "@usecase/service/LastPublishes/ILastPublishesService"
import ILastPublishesController from "./ILastPublishesController"

export default class LastPublishesController
  implements ILastPublishesController
{
  constructor(private _lastPublishesService: ILastPublishesService) {}
  async getLastPublishes(): Promise<defaultResponse> {
    try {
      return this._lastPublishesService.getLastPublishes()
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
