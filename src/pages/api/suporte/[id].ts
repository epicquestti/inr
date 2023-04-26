import { connect } from "@lib/backend"
import Reportes from "@schema/Reportes"
import ReportesLifeCicle from "@schema/ReportesLifeCicle"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getReportById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { id }
    } = req

    if (!id) throw new Error("Identificador ausente.")

    await connect()

    const report = await Reportes.findById(new ObjectId(id.toString()))
    const events = await ReportesLifeCicle.find({
      reporte: report?._id
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
