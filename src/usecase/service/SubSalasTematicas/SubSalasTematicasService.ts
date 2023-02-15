import { defaultResponse } from "@lib/types/defaultResponse"
import SubSalasTematicasRepository from "@usecase/repository/SubSalasTematicasRepository"
import { subSalaTematicaIdOutput } from "@validation/SubSalaTematica/subSalaTematicaId"
import { subSalaTematicaSaveOutput } from "@validation/SubSalaTematica/subSalaTematicaSave"
import ISubSalasTematicasService from "./ISubSalasTematicasService"

export default class SubSalasTematicasService
  implements ISubSalasTematicasService
{
  constructor(
    private _subSalasTematicasRepository: SubSalasTematicasRepository
  ) {}

  async subSalaTematicaSave(
    params: subSalaTematicaSaveOutput
  ): Promise<defaultResponse> {
    try {
      if (!params._id) {
        const subSalaExists =
          await this._subSalasTematicasRepository.subSalasTematicasGetByNome(
            params.nome
          )

        if (subSalaExists)
          throw new Error("Nome da sala fornecido já cadastrado.")

        const repoResponse =
          await this._subSalasTematicasRepository.subSalasTematicasCreate(
            params
          )

        if (!repoResponse?._id)
          throw new Error("Erro ao criar Sub Sala Temática na camada Service.")

        return {
          success: true,
          message: "Sub Sala Temática criada com sucesso.",
          data: repoResponse
        }
      } else {
        const subSalaExists =
          await this._subSalasTematicasRepository.subSalasTematicasGetById(
            params._id
          )

        if (!subSalaExists) throw new Error("Sub Sala Temática não encontrada.")

        const dbResponse =
          await this._subSalasTematicasRepository.subSalasTematicasUpdate(
            params
          )

        return {
          success: true,
          message: "Usuário editado com sucesso.",
          data: dbResponse
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async subSalaTematicaGetById(
    params: subSalaTematicaIdOutput
  ): Promise<defaultResponse> {
    try {
      const repoResponse =
        await this._subSalasTematicasRepository.subSalasTematicasGetById(
          params.id
        )

      if (!repoResponse?._id)
        throw new Error("Sub Sala Temática não encontrada.")

      return {
        success: true,
        message: "Exibindo Sub Sala Temática.",
        data: repoResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async subSalaTematicaDelete(
    id: subSalaTematicaIdOutput
  ): Promise<defaultResponse> {
    try {
      const repoResponse =
        await this._subSalasTematicasRepository.subSalasTematicasDelete(id.id)

      if (repoResponse <= 0) throw new Error("Erro ao excluir Tipo de Usuário.")

      return {
        success: true,
        message: "Sub Sala Temática excluída com sucesso.",
        data: repoResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
