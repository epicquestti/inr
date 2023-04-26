import { connect } from "@lib/backend/database"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getPublicacaoById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connect()
    const {
      method,
      query: { id }
    } = req

    if (!id) {
      return res.status(200).send({
        success: false,
        message: "Identificador ausente."
      })
    }

    if (method === "GET") {
      const pub = await PublicacaoModel.findOne({
        _id: new ObjectId(id.toString())
      })

      if (pub) {
        const contents = await PublicacaoContentsModel.find({
          idBoletim: pub._id
        })

        type content = {
          id?: string
          titulo?: string
          url?: string
          tipo: string
        }

        const c: content[] = []

        if (contents.length > 0) {
          for (let i = 0; i < contents.length; i++) {
            c.push({
              tipo: contents[i].tipo,
              url: contents[i].url,
              id: contents[i]._id.toString(),
              titulo: contents[i].title
            })
          }
        }

        return res.status(200).send({
          success: true,
          data: {
            publicId: pub.publicId,
            titulo: pub.title,
            tipo: pub.type?.id,
            createdAt: pub.createdAt,
            aproved: pub.aproved,
            aprovedAt: pub.aprovedAt,
            published: pub.published,
            publishedAt: pub.publishedAt,
            contents: c
          }
        })
      }

      res.status(200).send({
        success: false,
        message: "Publicacao não encontrada."
      })
    } else {
      res.status(200).send({
        success: false,
        message: "Method not Allowed."
      })
    }
  } catch (error) {
    res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
