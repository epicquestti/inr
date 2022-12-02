import { NextApiRequest, NextApiResponse } from "next"
import atualizacoesController from "src/usecase/controller/Atualizacoes"

export default async function getAtualizacoesById(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      method,
      query: { id }
    } = req

    const controller = await atualizacoesController.getAtualizacoesById({
      id: id?.toString() || ""
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
