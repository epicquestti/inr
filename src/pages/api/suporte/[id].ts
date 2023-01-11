import { connect } from "@lib/backend"
import Reportes from "@schema/Reportes"
import ReportesLifeCicle from "@schema/ReportesLifeCicle"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getReportById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { id }
    } = req

    await connect()

    if (!id) throw new Error("id obrigatório.")

    const report = await Reportes.findById(id.toString())

    if (!report) throw new Error("reporte não encontrado.")

    const events = await ReportesLifeCicle.find({
      reporte: report._id
    })

    res.status(200).send({
      success: true,
      data: {
        report,
        events
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
