import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import noticiasController from "@usecase/controller/Noticias"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const noticiaObj: noticiaSaveInput = req.body as noticiaSaveInput

    await connect()

    const controllerResponse = await noticiasController.noticiaSave(noticiaObj)

    if (!controllerResponse.success) {
      return res.status(200).json({
        success: false,
        message: controllerResponse.message
      })
    }

    res.status(200).json({
      success: true,
      message: controllerResponse.message,
      data: controllerResponse.data
    })
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default handle
