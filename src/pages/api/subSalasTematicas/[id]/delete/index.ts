import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import subSalasTematicasController from "@usecase/controller/SubSalasTematicas"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const id = req.query.id

    await connect()

    const controllerResponse =
      await subSalasTematicasController.subSalaTematicaDelete({
        id: id?.toString() || ""
      })

    if (!controllerResponse.success) throw new Error(controllerResponse.message)

    res.status(200).json({
      success: true,
      message: "Tipo de Usuário excluído com sucesso.",
      data: controllerResponse
    })
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default handle
