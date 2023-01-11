import { connect } from "@lib/backend"
import Reportes from "@schema/Reportes"
import ReportesLifeCicle from "@schema/ReportesLifeCicle"
import { NextApiRequest, NextApiResponse } from "next"

export default async function finishReport(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { id } = req.body

    console.log(req.body)

    if (!id) throw new Error("Identificador do Reporte ausente.")

    await connect()

    const verify = await Reportes.findById(id)

    if (!verify) throw new Error("Reporte não encontrado.")

    if (verify.status === "FINALIZADO")
      throw new Error("Reporte já finalizado.")

    await Reportes.updateOne(
      {
        _id: id
      },
      {
        status: "FINALIZADO"
      }
    )

    await ReportesLifeCicle.insertOne({
      reporte: id,
      event: "FINALIZADO",
      createdAt: new Date(),
      observacoes: `Report BUG - Status: FINALIZADO em: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`
    })
    return res.status(200).send({
      success: true,
      message: "Reporte de bug de usuário finalizado com sucesso."
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
