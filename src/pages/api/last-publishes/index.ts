import { connect } from "@lib/backend"
import lastPublishes from "@schema/LasPublishes"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import Updates from "@schema/Updates"
import { NextApiRequest, NextApiResponse } from "next"

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

export default async function getLastPublishes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let response: {
    lastBeId: number
    lastClassId: number
    boletim: sendModel[]
    classificador: sendModel[]
    version: {
      version?: number
      major?: number
      minor?: number
      severity?: string
      link?: string
      vigent?: boolean
    }
  } | null = {
    lastBeId: 0,
    lastClassId: 0,
    boletim: [],
    classificador: [],
    version: {
      version: 0,
      major: 0,
      minor: 0,
      severity: "",
      link: "",
      vigent: false
    }
  }

  try {
    await connect()
    const lastPublishesResponse = await lastPublishes.find()
    if (lastPublishesResponse.length > 0) {
      const bl = lastPublishesResponse[0].boletim
      const cl = lastPublishesResponse[0].classificador

      if (bl > 0) {
        const boletim = await PublicacaoModel.findOne({
          publicId: bl,
          "type.id": 1
        })

        if (boletim) {
          const bolContents = await PublicacaoContentsModel.find({
            idBoletim: boletim._id
          })

          let sendBe: sendModel = {
            title: boletim.title,
            createdAt: boletim.createdAt,
            publishedAt: boletim.publishedAt || new Date(),
            contents: []
          }

          for (let i = 0; i < bolContents.length; i++) {
            sendBe.contents.push({
              text: bolContents[i].title,
              tipo: bolContents[i].tipo,
              url: bolContents[i].url
            })
          }

          response.boletim = [sendBe]
        }

        response.lastBeId = bl
      } else if (bl === 0) {
        response.lastBeId = 0
      }

      if (cl > 0) {
        const classificador = await PublicacaoModel.findOne({
          publicId: cl,
          "type.id": 2
        })

        if (classificador) {
          const classContents = await PublicacaoContentsModel.find({
            idBoletim: classificador._id
          })

          let sendCl: sendModel = {
            title: classificador.title,
            createdAt: classificador.createdAt,
            publishedAt: classificador.publishedAt || new Date(),
            contents: []
          }

          for (let i = 0; i < classContents.length; i++) {
            sendCl.contents.push({
              text: classContents[i].title,
              tipo: classContents[i].tipo,
              url: classContents[i].url
            })
          }

          response.classificador = [sendCl]
        }
        response.lastClassId = cl
      } else if (cl === 0) {
        response.lastClassId = 0
      }

      const version = await Updates.findOne({
        vigent: true
      })

      response.version = {
        version: version?.version,
        link: version?.link,
        major: version?.major,
        minor: version?.minor,
        severity: version?.severity,
        vigent: version?.vigent
      }
    }

    return res.status(200).send(response)
  } catch (error) {
    return res.status(200).send(response)
  }
}
