import apiController from "@usecase/controller/Api"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
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
      message: controller.message,
      data: controller.data
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}

// export default validateHandle({
//   post: handle
// })
