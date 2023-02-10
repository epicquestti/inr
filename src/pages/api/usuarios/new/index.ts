import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import usuarioController from "@usecase/controller/Usuario"
import { usuarioSaveInput } from "@validation/Usuario/usuarioSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  console.log("API", req.body)

  try {
    await connect()

    const controllerObj: usuarioSaveInput = {
      email: req.body.email,
      senha: req.body.senha,
      tipoUsuario: req.body.tipoUsuario,
      _id: req.body._id
    }

    const controllerResponse = await usuarioController.usuarioSave(
      controllerObj
    )

    if (!controllerResponse.success) {
      return res.status(200).json({
        success: false,
        message: controllerResponse.message
      })
    }

    return res.status(200).json({
      success: true,
      message: "Usuário criado com sucesso.",
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
