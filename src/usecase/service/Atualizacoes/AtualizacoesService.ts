import { defaultResponse } from "@lib/types/defaultResponse"
import { ObjectId } from "mongodb"
import UpdatesRepository from "src/usecase/repository/UpdatesRepository"
import { atualizacaoListOutput } from "src/validation/Atualizacoes/atualizacaoList"
import IAtualizacoesService from "./IAtualizacoesService"

export default class AtualizacoesService implements IAtualizacoesService {
  constructor(private _updatesRepository: UpdatesRepository) {}
  async salvarAtualizacao(params: {
    version: number
    major: number
    minor: number
    severity: string
    link: string
    id: string | null
  }): Promise<defaultResponse> {
    try {
      if (!params.id) {
        const verify = await this._updatesRepository.verifyIfExist(
          params.version,
          params.major,
          params.minor
        )

        if (verify) throw new Error("Versão ja cadastrada.")

        const newVersion = await this._updatesRepository.novaVersion(
          params.version,
          params.major,
          params.minor,
          params.severity,
          params.link,
          false
        )

        return {
          success: true,
          message: "Nova Versão cadastrada.",
          data: newVersion
        }
      } else {
        const justPublished = await this._updatesRepository.getUpdateById(
          new ObjectId(params.id)
        )

        if (!justPublished) throw new Error("Versão não existe.")

        if (justPublished.vigent) throw new Error("Esta já é a versão vigente.")

        const verifyEdit =
          await this._updatesRepository.verifyIfExistNotEqualId(
            justPublished._id,
            justPublished.version,
            justPublished.major,
            justPublished.minor
          )

        if (verifyEdit) throw new Error("Versão ja cadastrada.")

        const updated = await this._updatesRepository.updateVersion(
          justPublished._id,
          params.version,
          params.major,
          params.minor,
          justPublished.vigent,
          params.severity,
          params.link
        )

        if (updated > 0) {
          return {
            success: true,
            message: "Nova versão editada",
            data: {
              _id: justPublished._id,
              version: params.version,
              major: params.major,
              minor: params.minor,
              severity: params.severity,
              link: params.link,
              vigent: justPublished.vigent
            }
          }
        } else {
          return {
            success: false,
            message: "Nada foi alterado."
          }
        }
      }
    } catch (error: any) {
      return {
        success: error.message
      }
    }
  }

  async publish(params: { id: ObjectId }): Promise<defaultResponse> {
    try {
      const toPublish = await this.getAtualizacoesById({
        id: params.id.toString()
      })

      if (!toPublish) throw new Error("Atualização não encontrada.")

      if (toPublish.data.vigent)
        throw new Error("Essa já é a atualização vigente.")

      const atual = await this._updatesRepository.getVigentNotId(
        params.id.toString()
      )

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
