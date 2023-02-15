import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import subSalasTematicasController from "@usecase/controller/SubSalasTematicas"
import { subSalaTematicaSaveInput } from "@validation/SubSalaTematica/subSalaTematicaSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    await connect()

    const subSalaObj: subSalaTematicaSaveInput = {
      _id: req.body._id,
      nome: req.body.nome
    }

    const controllerResponse =
      await subSalasTematicasController.subSalaTematicaSave(subSalaObj)

    if (!controllerResponse.success) {
      return res.status(200).json({
        success: false,
        message: controllerResponse.message
      })
    }

    if (req.body._id) {
      return res.status(200).json({
        success: true,
        message: "Sub Sala Temática editada com sucesso.",
        data: controllerResponse
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Sub Sala Temática criada com sucesso.",
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
