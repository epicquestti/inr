import { defaultResponse } from "@lib/types/defaultResponse"
import { autorIdOutput } from "@validation/Autor/autorId"
import { autorSaveOutput } from "@validation/Autor/autorSave"
import { ObjectId } from "mongodb"

export default interface IAutorService {
  autorSave(params: autorSaveOutput): Promise<defaultResponse>
  autorGetById(params: ObjectId): Promise<defaultResponse>
  autorDelete(id: autorIdOutput): Promise<defaultResponse>
}
