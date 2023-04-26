import { connect } from "@lib/backend"
import ReportDestinatario from "@schema/ReportDestinatarios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function saveListaDestinatarios(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { destinatarios } = req.body

    if (!destinatarios) throw new Error("Lista de destinatários vazia.")

    await connect()

    await ReportDestinatario.deleteMany({})

    for (let i = 0; i < destinatarios.length; i++) {
      await ReportDestinatario.insertOne({
        nome: destinatarios[i].nome,
        email: destinatarios[i].email
      })
    }

    return res.status(200).send({
      success: true
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
