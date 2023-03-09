import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import salaTematicaController from "@usecase/controller/SalaTematica"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const { id } = req.query

    await connect()

    const controllerResponse = await salaTematicaController.salaTematicaGetById(
      {
        _id: id?.toString() || ""
      }
    )

    if (!controllerResponse.success) throw new Error(controllerResponse.message)

    res.status(200).json({
      success: true,
      message: "Exibindo Tipo de Usuário.",
      data: controllerResponse
    })
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message
    })
  }
}