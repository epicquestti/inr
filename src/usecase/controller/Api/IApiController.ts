import { defaultResponse } from "@lib/types/defaultResponse"
import { saveApiInput } from "@validation/Api/saveApi"
import { getByIdInput } from "@validation/common/getById"

export interface IApiController {
  saveApi(params: saveApiInput): Promise<defaultResponse>
  getApiById(params: getByIdInput): Promise<defaultResponse>
  deleteApi(params: getByIdInput): Promise<defaultResponse>
}
