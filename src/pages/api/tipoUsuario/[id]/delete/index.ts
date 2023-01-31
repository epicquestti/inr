import { apiResponse } from "@lib/types/apiResponse"
import tipoUsuarioController from "@usecase/controller/TipoUsuario"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const { id } = req.body

    const controllerResponse = await tipoUsuarioController.tipoUsuarioDelete(id)

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
