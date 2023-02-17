import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import salaTematicaController from "@usecase/controller/SalaTematica"
import { salaTematicaSaveInput } from "@validation/SalaTematica/salaTematicaSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const tipoUsuarioObj: salaTematicaSaveInput = {
      _id: req.body._id,
      nome: req.body.nome,
      subSalasTematicas: req.body.subSalasTematicas
    }

    await connect()

    const controllerResponse = await salaTematicaController.salaTematicaSave(
      tipoUsuarioObj
    )

    if (!controllerResponse.success) {
      return res.status(200).json({
        success: false,
        message: controllerResponse.message
      })
    }

    res.status(200).json({
      success: true,
      message: "Sala Temática criada com sucesso.",
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
