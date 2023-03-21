import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import autorController from "@usecase/controller/Autor"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    await connect()

    const controllerResponse = await autorController.autorSave(req.body)

    console.log(controllerResponse)

    res.status(200).json({
      success: true,
      message: controllerResponse.message,
      data: controllerResponse
    })
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default handle
