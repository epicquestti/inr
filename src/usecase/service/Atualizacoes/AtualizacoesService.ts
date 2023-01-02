import { defaultResponse } from "@lib/types/defaultResponse"
import { ObjectId } from "mongodb"
import UpdatesRepository from "src/usecase/repository/UpdatesRepository"
import { atualizacaoListOutput } from "src/validation/Atualizacoes/atualizacaoList"
import IAtualizacoesService from "./IAtualizacoesService"

export default class AtualizacoesService implements IAtualizacoesService {
  constructor(private _updatesRepository: UpdatesRepository) {}
  async publish(params: { id: string }): Promise<defaultResponse> {
    try {
      const toPublish = await this.getAtualizacoesById({ id: params.id })

      if (!toPublish) throw new Error("Atualização não encontrada.")

      if (toPublish.data.vigent)
        throw new Error("Essa já é a atualização vigente.")

      const atual = await this._updatesRepository.getVigentNotId(params.id)

      for (let i = 0; i < atual.length; i++)
        await this._updatesRepository.changeVigantState(atual[i]._id, false)

      const thisIsFianl = await this._updatesRepository.changeVigantState(
        new ObjectId(params.id),
        true
      )

      if (thisIsFianl > 0) {
        return {
          success: true,
          message: "Atualização Publicada com sucesso."
        }
      } else {
        return {
          success: false,
          message: "Atualização não publicada."
        }
      }
    } catch (error: any) {
      return {
        success: error.message
      }
    }
  }
  async getAtualizacoesById(params: { id: string }): Promise<defaultResponse> {
    try {
      const atualizacao = await this._updatesRepository.getUpdateById(
        new ObjectId(params.id)
      )

      if (!atualizacao) throw new Error("Atualização não encontrada.")

      return {
        success: true,
        data: {
          id: atualizacao._id.toString(),
          version: atualizacao.version,
          major: atualizacao.major,
          minor: atualizacao.minor,
          severity: atualizacao.severity,
          link: atualizacao.link,
          vigent: atualizacao.vigent
        }
      }
    } catch (error: any) {
      return {
        success: error.message
      }
    }
  }

  async atualizacaoList(
    params: atualizacaoListOutput
  ): Promise<defaultResponse> {
    try {
      return {
        success: true,
        data: {}
      }
    } catch (error: any) {
      return {
        success: error.message
      }
    }
  }
}
