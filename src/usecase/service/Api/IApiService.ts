import { defaultResponse } from "@lib/types/defaultResponse"
import { saveApiOutput } from "@validation/Api/saveApi"
import { getByIdOutput } from "@validation/common/getById"

export interface IApiService {
  saveApi(params: saveApiOutput): Promise<defaultResponse>
  getApiById(params: getByIdOutput): Promise<defaultResponse>
  deleteApi(params: getByIdOutput): Promise<defaultResponse>
}
