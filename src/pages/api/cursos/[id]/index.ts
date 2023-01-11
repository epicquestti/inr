import validateHandle from "@lib/backend/validateHandle"
import { apiResponse } from "@lib/types/apiResponse"
import cursoController from "@usecase/controller/curso"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const { id } = req.query

    const controllerResponse = await cursoController.cursoGetById({
      id: id?.toString() || ""
    })

    return res.status(200).send(controllerResponse)
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default validateHandle({ get: handle }, { validationLevel: "free" })
