import { connect } from "@lib/backend/database"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import { NextApiRequest, NextApiResponse } from "next"

export default async function deletePublicacao(
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

    if (method === "DELETE") {
      const publishToDelete = await PublicacaoModel.findById(id.toString())

      if (publishToDelete) {
        await PublicacaoContentsModel.deleteMany({
          idBoletim: publishToDelete._id
        })

        res.status(200).send({
          success: true,
          message: "Excluida com sucesso."
        })
      } else {
        res.status(200).send({
          success: false,
          message: "Publicação não encontrada"
        })
      }
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
