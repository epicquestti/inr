import { defaultResponse } from "@lib/types/defaultResponse"
import { ObjectId } from "mongodb"
import UpdatesRepository from "src/usecase/repository/UpdatesRepository"
import IAtualizacoesService from "./IAtualizacoesService"

export default class AtualizacoesService implements IAtualizacoesService {
  constructor(private _updatesRepository: UpdatesRepository) {}
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
}
