import connect from "@lib/backend/database"
import PublicacaoModel from "@schema/Publicacao"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetAfterBoletins(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response: { id: number }[] = []
  try {
    await connect()

    const {
      method,
      query: { id }
    } = req

    if (!id) {
      return res.status(200).send(response)
    }

    if (method === "GET") {
      const list = await PublicacaoModel.find({
        publicId: {
          $gt: id
        },
        "type.id": 2
      })

      if (list.length > 0)
        for (let i = 0; i < list.length; i++)
          response.push({
            id: list[i].publicId
          })

      return res.status(200).send(response)
    } else {
      return res.status(200).send(response)
    }
  } catch (error) {
    return res.status(200).send(response)
  }
}
