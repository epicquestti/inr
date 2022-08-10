import { connect } from "@lib/backend"
import ReportesLifeCicle from "@schema/ReportesLifeCicle"
import { NextApiRequest, NextApiResponse } from "next"
import Reportes from "../../../../schemas/Reportes"

export default async function searchAtualizacoes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connect()

    const reporteRes = await Reportes.create({
      createdAt: new Date(),
      type: req.body.reportType,
      status: "CRIADO",
      os: req.body.os,
      version: req.body.version,
      appId: req.body.appConfig.instanceName,
      lastBeReceived: req.body.appConfig.lastBeId,
      lastClassReceived: req.body.appConfig.lastClassId,
      notifyClassificador: req.body.appConfig.notifyClassificador,
      notifyBoletim: req.body.appConfig.notifyBoletim,
      tratamento: req.body.tratamento,
      nome: req.body.nome,
      email: req.body.email,
      ddd: req.body.ddd,
      fone: req.body.fone,
      contactWhats: req.body.contactWhats,
      contactEmail: req.body.contactEmail,
      contactLigacao: req.body.contactLigacao,
      contactNo: req.body.contactNo,
      descricao: req.body.descricao
    })

    await ReportesLifeCicle.create({
      reporte: reporteRes._id,
      event: "CRIADO",
      createdAt: new Date(),
      observacoes: `Report BUG - Status: CRIADO em: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`
    })

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
