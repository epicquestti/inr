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
    const tipoUsuarioObj: tipoUsuarioSaveInput = {
      _id: req.body._id,
      nome: req.body.nome,
      funcoes: req.body.funcoes,
      super: req.body.super
    }

    await connect()

    const controllerResponse = await tipoUsuarioController.tipoUsuarioSave(
      tipoUsuarioObj
    )

    res.status(200).json({
      success: true,
      message: "Tipo de Usuário criado com sucesso.",
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
