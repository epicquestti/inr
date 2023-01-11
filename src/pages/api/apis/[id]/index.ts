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

    console.log("ID getByID:", id)
    const controller = await apiController.getApiById({
      id: id?.toString() || ""
    })

    console.log("controller getbyid: ", controller)

    if (!controller.success) throw new Error(controller.message)

    res.status(200).send({
      success: true,
      data: controller.data,
      message: controller.message
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
