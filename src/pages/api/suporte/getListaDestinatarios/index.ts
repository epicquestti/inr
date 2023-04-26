import { connect } from "@lib/backend"
import ReportDestinatario from "@schema/ReportDestinatarios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getPublicacaoById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connect()
    const response = await ReportDestinatario.find({})
    res.status(200).send({
      success: true,
      data: {
        list: response
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
