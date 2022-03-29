import connect from "@lib/database"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetClassificador(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  type contentTypes = {
    tipo: string
    url: string
    text: string
  }
  let response: {
    titulo: string
    criadoEm: Date
    publicadoEm: Date
    contents: contentTypes[]
  } | null = null
  try {
    await connect()

    const {
      method,
      query: { id }
    } = req

    if (!id) {
      return res.status(200).send({
        success: false,
        message: "id ausuente"
      })
    }

    if (method === "GET") {
      const publicacao = await PublicacaoModel.findOne({
        publicId: parseInt(id.toString()),
        "type.id": 2
      })

      if (publicacao) {
        const contentList = await PublicacaoContentsModel.find({
          idBoletim: publicacao._id
        })

        const cList: contentTypes[] = []

        if (contentList.length > 0) {
          for (let ii = 0; ii < contentList.length; ii++) {
            cList.push({
              text: contentList[ii].title,
              tipo: contentList[ii].tipo,
              url: contentList[ii].url
            })
          }
        }

        response = {
          titulo: publicacao.title,
          criadoEm: publicacao.createdAt,
          publicadoEm: publicacao.publishedAt
            ? publicacao.publishedAt
            : new Date(),
          contents: cList
        }
      }
      res.status(200).send(response)
    } else {
      res.status(200).send(response)
    }
  } catch (error) {
    return res.status(200).send(response)
  }
}
