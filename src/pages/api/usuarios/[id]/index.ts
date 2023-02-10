import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import usuarioController from "@usecase/controller/Usuario"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    await connect()

    const { id } = req.query
    console.log("ID", id)

    if (!id) {
      return res.status(200).json({
        success: false,
        message: "ID é obrigatório."
      })
    }

    const controllerResponse = await usuarioController.usuarioGetById({
      id: id.toString() || ""
    })

    console.log("controllerResponse", controllerResponse)

    if (!controllerResponse.data._id) {
      return res.status(200).json({
        success: false,
        message: "Nenhum usuário encontrado."
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Exibindo Usuário.",
        data: controllerResponse.data
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
