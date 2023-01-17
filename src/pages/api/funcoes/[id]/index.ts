import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import funcaoController from "@usecase/controller/Funcao"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const { id } = req.query

    await connect()

    const controllerResponse = await funcaoController.funcaoGetById({
      id: id?.toString() || ""
    })

    return res.status(200).send(controllerResponse)
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default handle
