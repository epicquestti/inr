import { defaultResponse } from "@lib/types/defaultResponse"
import CursoRepository from "@usecase/repository/CursoRepository"
import { cursoCreateOutput } from "@validation/Cursos/cursoCreate"
import { cursoIdOutput } from "@validation/Cursos/cursoId"
import { cursoUpdateOutput } from "@validation/Cursos/cursoUpdate"
import ICursoService from "./ICursoService"

export default class CursoService implements ICursoService {
  constructor(private _cursoRepository: CursoRepository) {}

  async cursoGetById(params: cursoIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._cursoRepository.cursoGetById({
        id: params.id
      })

      if (!repositoryResponse?._id) throw new Error("Curso não encontrado.")

      return {
        success: true,
        message: "Exibindo Curso.",
        data: repositoryResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoCreate(params: cursoCreateOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._cursoRepository.cursoCreate(params)

      if (!repositoryResponse?._id) throw new Error("Erro ao criar Curso.")

      return {
        success: true,
        message: "Curso criado com sucesso.",
        data: repositoryResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoUpdate(params: cursoUpdateOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._cursoRepository.cursoUpdate(params)

      if (repositoryResponse <= 0) throw new Error("Erro ao editar Curso.")

      return {
        success: true,
        message: "Curso editado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async cursoDelete(params: cursoIdOutput): Promise<defaultResponse> {
    console.log("Service")

    try {
      const repositoryResponse = await this._cursoRepository.cursoDelete(params)

      if (repositoryResponse <= 0) throw new Error("Erro ao excluir Curso.")

      return {
        success: true,
        message: "Curso excluído com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
