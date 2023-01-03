import { defaultResponse } from "@lib/types/defaultResponse"
import { getByIdOutput } from "@validation/common/getById"
import { cursoCreateOutput } from "@validation/Cursos/cursoCreate"
import { cursoUpdateOutput } from "@validation/Cursos/cursoUpdate"

export default interface ICursoService {
  cursoCreate(params: cursoCreateOutput): Promise<defaultResponse>
  cursoUpdate(params: cursoUpdateOutput): Promise<defaultResponse>
  cursoGetById(params: getByIdOutput): Promise<defaultResponse>
}
