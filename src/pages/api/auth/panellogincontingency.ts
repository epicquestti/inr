import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import usuarioController from "@usecase/controller/Usuario"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> {
  try {
    await connect()
    console.log(req.body.credential)

    const controller = await usuarioController.authenticationPanelContingency({
      credential: req.body.credential
    })

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
