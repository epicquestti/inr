import { defaultResponse } from "@lib/types/defaultResponse"
import { saveApiInput } from "@validation/Api/saveApi"

export interface IApiController {
  saveApi(params: saveApiInput): Promise<defaultResponse>
}
