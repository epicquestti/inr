import connect from "@lib/database"
import PublicacaoModel from "@schema/Publicacao"
import { NextApiRequest, NextApiResponse } from "next"

export default async function aprovePublicacao(
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
      await PublicacaoModel.updateOne(
        { _id: id },
        {
          aproved: true,
          aprovedAt: new Date(new Date().setHours(new Date().getHours() - 3))
        }
      )

      res.status(200).send({
        success: true,
        message: "Publicacao aprovada com sucesso."
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
