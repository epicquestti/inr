import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import tipoUsuarioController from "@usecase/controller/TipoUsuario"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const { id } = req.query

    await connect()

    const controllerResponse = await tipoUsuarioController.tipoUsuarioGetById({
      id: id?.toString() || ""
    })

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

export default handle
