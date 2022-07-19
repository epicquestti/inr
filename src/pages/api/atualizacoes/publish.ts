import connect from "@lib/database"
import Updates from "@schema/Updates"
import { NextApiRequest, NextApiResponse } from "next"

export default async function publishAtualizacao(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      // method,
      query: { id }
    } = req

    if (!id) throw new Error("id ausente")

    await connect()

    const toPublish = await Updates.findOne({
      _id: id
    })

    if (!toPublish) throw new Error("Atualização não encontrada.")

    if (toPublish.vigent) throw new Error("Essa já é a atualização vigente.")

    const atual = await Updates.find({
      $and: [
        {
          vigent: true
        },
        {
          _id: {
            $ne: id
          }
        }
      ]
    })

    for (let i = 0; i < atual.length; i++) {
      const updateItemId: string = atual[i].id

      const resss = await Updates.updateOne(
        {
          _id: updateItemId
        },
        {
          $set: {
            vigent: false
          }
        }
      )
    }

    const toPublishResult = await Updates.updateOne(
      {
        _id: id
      },
      {
        vigent: true
      }
    )

    if (toPublishResult.modifiedCount > 0) {
      res.status(200).send({
        success: true,
        message: "Atualização Publicada com sucesso."
      })
    } else {
      res.status(200).send({
        success: false,
        message: "Atualização não publicada."
      })
    }
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
