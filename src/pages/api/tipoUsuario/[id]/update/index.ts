import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import tipoUsuarioController from "@usecase/controller/TipoUsuario"
import { tipoUsuarioSaveInput } from "@validation/TipoUsuario/tipoUsuarioSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    await connect()

    const tipoUsuarioObj: tipoUsuarioSaveInput = {
      funcoes: req.body.funcoes,
      nome: req.body.nome,
      super: req.body.super,
      _id: req.body._id
    }

    const controllerResponse = await tipoUsuarioController.tipoUsuarioUpdate(
      tipoUsuarioObj
    )

    if (!controllerResponse.success) {
      return res.status(200).json({
        success: false,
        message: controllerResponse.message
      })
    }

    return res.status(200).json({
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
