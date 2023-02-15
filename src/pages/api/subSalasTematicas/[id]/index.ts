import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import subSalasTematicasController from "@usecase/controller/SubSalasTematicas"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    await connect()

    const { id } = req.query

    if (!id) {
      return res.status(200).json({
        success: false,
        message: "ID é obrigatório."
      })
    }

    const controllerResponse =
      await subSalasTematicasController.subSalaTematicaGetById({
        id: id.toString() || ""
      })

    if (!controllerResponse.data._id) {
      return res.status(200).json({
        success: false,
        message: "Nenhuma Sub Sala Temática encontrada."
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Exibindo Sub Sala Temática.",
        data: controllerResponse
      })
    }
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default handle
