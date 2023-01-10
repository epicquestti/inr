import CursoModel, { CursoDocument } from "@schema/Cursos"
import { cursoCreateOutput } from "@validation/Cursos/cursoCreate"
import { cursoIdOutput } from "@validation/Cursos/cursoId"
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

  async cursoGetById(params: cursoIdOutput): Promise<CursoDocument | null> {
    try {
      const result = await CursoModel.findById(params.id)

      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async cursoDelete(params: cursoIdOutput): Promise<number> {
    console.log("Repository")

    try {
      const result = await CursoModel.deleteOne({
        _id: params.id
      })

      return result.deletedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
