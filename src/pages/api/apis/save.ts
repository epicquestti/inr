import validateHandle from "@lib/backend/validateHandle"
import apiController from "@usecase/controller/Api"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      body: { _id, url, metodo, tipo }
    } = req

    const controller = await apiController.saveApi({
      _id,
      url,
      metodo,
      tipo
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
  post: handle
})
