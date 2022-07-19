import connect from "@lib/database"
import Updates from "@schema/Updates"

import { NextApiRequest, NextApiResponse } from "next"

export default async function getAtualizaçõesById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      method,
      query: { id }
    } = req

    if (!id) throw new Error("id ausente.")

    await connect()
    const atualizacao = await Updates.findOne({
      _id: id.toString()
    })

    const updatesSelected = {
      id: atualizacao?._id.toString(),
      version: atualizacao?.version,
      major: atualizacao?.major,
      minor: atualizacao?.minor,
      severity: atualizacao?.severity,
      link: atualizacao?.link,
      vigent: atualizacao?.vigent
    }

    if (atualizacao) {
      res.status(200).send({
        success: true,
        data: updatesSelected
      })
    } else {
      res.status(200).send({
        success: false,
        message: "Atualização não encontrada."
      })
    }
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
