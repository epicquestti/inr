import CursoModel, { CursoDocument } from "@schema/Cursos"
import { getByIdOutput } from "@validation/common/getById"
import { cursoCreateOutput } from "@validation/Cursos/cursoCreate"
import { cursoUpdateOutput } from "@validation/Cursos/cursoUpdate"

export default class CursoRepository {
  async cursoCreate(params: cursoCreateOutput): Promise<CursoDocument | null> {
    try {
      return await CursoModel.insertOne({
        active: params.active,
        destaque: params.destaque,
        nome: params.nome,
        url: params.url
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async cursoUpdate(params: cursoUpdateOutput): Promise<number> {
    try {
      const result = await CursoModel.updateOne(
        { _id: params.id },
        {
          $set: {
            active: params.active,
            destaque: params.destaque,
            nome: params.nome,
            url: params.url
          }
        }
      )

      return result.modifiedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async cursoGetById(params: getByIdOutput): Promise<CursoDocument | null> {
    try {
      const result = await CursoModel.findById(params.toString())

      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
