import { defaultResponse } from "@lib/types/defaultResponse"
import { autorIdInput } from "@validation/Autor/autorId"
import { autorSaveInput } from "@validation/Autor/autorSave"

export default interface IAutorController {
  autorSave(params: autorSaveInput): Promise<defaultResponse>
  autorGetById(params: autorIdInput): Promise<defaultResponse>
  autorDelete(params: autorIdInput): Promise<defaultResponse>
}
