import apiController from "@usecase/controller/Api"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { id }
    } = req

    const controller = await apiController.deleteApi({
      id: id?.toString() || ""
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
