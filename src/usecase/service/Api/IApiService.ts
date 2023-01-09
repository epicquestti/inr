import { defaultResponse } from "@lib/types/defaultResponse"
import { saveApiOutput } from "@validation/Api/saveApi"

export interface IApiService {
  saveApi(params: saveApiOutput): Promise<defaultResponse>
}
