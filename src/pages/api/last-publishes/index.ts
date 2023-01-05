import validateHandle from "@lib/backend/validateHandle"
import { apiResponse } from "@lib/types/apiResponse"
import lastPublishesController from "@usecase/controller/LastPublishes"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> {
  try {
    const controller = await lastPublishesController.getLastPublishes()
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

export default validateHandle(
  {
    get: handle
  },
  {
    validationLevel: "free"
  }
)
