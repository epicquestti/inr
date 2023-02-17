import { defaultResponse } from "@lib/types/defaultResponse"
import SalaSubSalaTematicaRepository from "@usecase/repository/salaSubSalaTematicaRepository"
import SalaTematicaRepository from "@usecase/repository/SalaTematicaRepository"
import { salaTematicaIdOutput } from "@validation/SalaTematica/salaTematicaId"
import { salaTematicaSaveOutput } from "@validation/SalaTematica/salaTematicaSave"
import ISalaTematicaService from "./ISalaTematicaService"

export default class SalaTematicaService implements ISalaTematicaService {
  constructor(
    private _salaTematicaRepository: SalaTematicaRepository,
    private _salaSubSalaRepository: SalaSubSalaTematicaRepository
  ) {}

  async salaTematicaSave(
    params: salaTematicaSaveOutput
  ): Promise<defaultResponse> {
    try {
      if (!params._id) {
        const verifyNome =
          await this._salaTematicaRepository.salaTematicaGetByNome(params.nome)

        if (verifyNome) {
          throw new Error(
            "Já existe uma Sala Temática cadastrada com o nome fornecido."
          )
        }

        const saveResponse =
          await this._salaTematicaRepository.salaTematicaCreate(params)

        if (!saveResponse) throw new Error("Erro ao criar Sala Temática.")

        if (params.subSalasTematicas && params.subSalasTematicas?.length > 0) {
          for (let i = 0; i < params.subSalasTematicas.length; i++) {
            const relationResponse =
              await this._salaSubSalaRepository.salaSubSalaTematicaRelationCreate(
                saveResponse._id,
                params.subSalasTematicas[i]
              )

            if (!relationResponse)
              throw new Error("Erro ao criar Relações de Sala Temática.")
          }
        }

        return {
          success: true,
          message: "Sala Temática criada com sucesso.",
          data: saveResponse
        }
      } else {
        const salaExists =
          await this._salaTematicaRepository.salaTematicaGetById(params._id)

        if (!salaExists) throw new Error("Sala Temática não encontrada.")

        const updateResponse =
          await this._salaTematicaRepository.salaTematicaUpdate(params)

        await this._salaSubSalaRepository.salaSubSalaTematicaRelationDelete(
          params._id
        )

        if (params.subSalasTematicas && params.subSalasTematicas?.length > 0) {
          for (let i = 0; i < params.subSalasTematicas.length; i++) {
            const relationResponse =
              await this._salaSubSalaRepository.salaSubSalaTematicaRelationCreate(
                params._id,
                params.subSalasTematicas[i]
              )

            if (!relationResponse)
              throw new Error("Erro ao criar Relações de Sala Temática.")
          }
        }

        return {
          success: true,
          message: "Sala Temática criada com sucesso.",
          data: updateResponse
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  salaTematicaDelete(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaGetById(id: salaTematicaIdOutput): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaGetByNome(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
