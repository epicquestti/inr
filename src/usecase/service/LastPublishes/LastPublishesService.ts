import { defaultResponse } from "@lib/types/defaultResponse"
import LastPublishesRepository from "@usecase/repository/LastPublishesRepository"
import PublicacaoContentsRepository from "@usecase/repository/PublicacaoContentsRepository"
import PublicacaoRepository from "@usecase/repository/PublicacaoRepository"
import UpdatesRepository from "@usecase/repository/UpdatesRepository"
import { ILastPublishesService } from "./ILastPublishesService"

type sendModel = {
  title: string
  createdAt: Date
  publishedAt: Date
  contents: {
    text: string
    url?: string
    tipo: string
  }[]
}

export default class LastPublishesService implements ILastPublishesService {
  constructor(
    private _lastPublishesRepository: LastPublishesRepository,
    private _publicacaoRepository: PublicacaoRepository,
    private _publicacaoContentsRepository: PublicacaoContentsRepository,
    private _updatesRepository: UpdatesRepository
  ) {}

  async getLastPublishes(): Promise<defaultResponse> {
    try {
      const data: any = {}
      const listLastPublishes =
        await this._lastPublishesRepository.getLastPublishes()

      const bl = listLastPublishes[0].boletim
      const cl = listLastPublishes[0].classificador

      if (bl) {
        const boletim =
          await this._publicacaoRepository.getPublicacaoByPublicId(bl, 1)

        if (boletim) {
          const contents =
            await this._publicacaoContentsRepository.getPublicacaoContents(
              boletim._id
            )

          let sendBe: sendModel = {
            title: boletim.title,
            createdAt: boletim.createdAt,
            publishedAt: boletim.publishedAt || new Date(),
            contents: []
          }

          for (let i = 0; i < contents.length; i++) {
            sendBe.contents.push({
              text: contents[i].title,
              tipo: contents[i].tipo,
              url: contents[i].url
            })
          }

          data.boletim = [sendBe]
        }

        data.lastBeId = bl
      } else if (bl === 0) {
        data.lastBeId = 0
      }

      if (cl) {
        const classificador =
          await this._publicacaoRepository.getPublicacaoByPublicId(cl, 2)

        if (classificador) {
          const contents =
            await this._publicacaoContentsRepository.getPublicacaoContents(
              classificador._id
            )

          let sendCl: sendModel = {
            title: classificador.title,
            createdAt: classificador.createdAt,
            publishedAt: classificador.publishedAt || new Date(),
            contents: []
          }

          for (let i = 0; i < contents.length; i++) {
            sendCl.contents.push({
              text: contents[i].title,
              tipo: contents[i].tipo,
              url: contents[i].url
            })
          }

          data.classificador = [sendCl]
        }

        data.lastClassId = cl
      } else if (cl === 0) {
        data.lastClassId = 0
      }

      const version = await this._updatesRepository.getVigentVersion()
      data.version = version

      return {
        success: true,
        data: data
      }
    } catch (error: any) {
      return {
        success: error.message
      }
    }
  }
}
