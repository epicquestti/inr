import validateHandle from "@lib/backend/validateHandle"
import atualizacoesController from "@usecase/controller/Atualizacoes"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      body: { id, version, major, minor, severity, link }
    } = req

    const controller = await atualizacoesController.salvarAtualizacao({
      id,
      version,
      major,
      minor,
      severity,
      link
    })

    if (!controller.success) throw new Error(controller.message)

    res.status(200).send({
      success: true,
      data: controller.message
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}

export default validateHandle({
  get: handle
})
