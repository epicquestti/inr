import { defaultResponse } from "@lib/types/defaultResponse"
import { cursoCreateOutput } from "@validation/Cursos/cursoCreate"
import { cursoIdOutput } from "@validation/Cursos/cursoId"
import { cursoUpdateOutput } from "@validation/Cursos/cursoUpdate"

export default interface ICursoService {
  cursoCreate(params: cursoCreateOutput): Promise<defaultResponse>
  cursoUpdate(params: cursoUpdateOutput): Promise<defaultResponse>
  cursoGetById(params: cursoIdOutput): Promise<defaultResponse>
  cursoDelete(params: cursoIdOutput): Promise<defaultResponse>
}
