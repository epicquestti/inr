import { defaultResponse } from "@lib/types/defaultResponse"
import { getByIdInput } from "@validation/common/getById"
import { cursoCreateInput } from "@validation/Cursos/cursoCreate"
import { cursoUpdateInput } from "@validation/Cursos/cursoUpdate"

export default interface ICursoController {
  cursoCreate(params: cursoCreateInput): Promise<defaultResponse>
  cursoUpdate(params: cursoUpdateInput): Promise<defaultResponse>
  cursoGetById(params: getByIdInput): Promise<defaultResponse>
  cursoDelete(params: getByIdInput): Promise<defaultResponse>
}
