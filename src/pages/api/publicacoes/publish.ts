import { connect } from "@lib/backend/database"
import LastPublishes from "@schema/LasPublishes"
import PublicacaoModel from "@schema/Publicacao"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function publishPublicacao(
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
      const publishToAprove = await PublicacaoModel.findById(
        new ObjectId(id.toString())
      )

      if (publishToAprove) {
        publishToAprove.published = true
        publishToAprove.publishedAt = new Date(
          new Date().setHours(new Date().getHours() - 3)
        )

        await PublicacaoModel.updateOne(
          { _id: new ObjectId(id.toString()) },
          publishToAprove
        )

        const lp = await LastPublishes.find({})

        if (lp.length !== 1) {
          await LastPublishes.deleteMany({})
          if (publishToAprove.type?.id === 1) {
            await LastPublishes.insertOne({
              boletim: publishToAprove.publicId,
              classificador: 0
            })
          } else {
            await LastPublishes.insertOne({
              boletim: 0,
              classificador: publishToAprove.publicId
            })
          }
        } else {
          const lpToBeUpdated = lp[0]
          if (publishToAprove.type?.id === 1)
            lpToBeUpdated.boletim = publishToAprove.publicId
          else lpToBeUpdated.classificador = publishToAprove.publicId

          await LastPublishes.updateOne(
            { _id: lpToBeUpdated._id },
            lpToBeUpdated
          )
        }

        res.status(200).send({
          success: true,
          message: "Publicação realizada com sucesso."
        })
      } else {
        return res.status(200).send({
          success: false,
          message: "Publicação não encontrada."
        })
      }
    } else {
      return res.status(200).send({
        success: false,
        message: "Method not Allowed."
      })
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
