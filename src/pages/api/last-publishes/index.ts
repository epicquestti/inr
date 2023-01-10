import { apiResponse } from "@lib/types/apiResponse"
import lastPublishesController from "@usecase/controller/LastPublishes"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> {
  try {
    const controller = await lastPublishesController.getLastPublishes()
    if (!controller.success) throw new Error(controller.message)

    res.status(200).send({
      success: true,
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
//   get: handle
// })
