import { connect } from "@lib/backend"
import { apiResponse } from "@lib/types/apiResponse"
import funcaoController from "@usecase/controller/Funcao"
import { funcaoSaveInput } from "@validation/Funcoes/funcaoSave"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const funcaoObj: funcaoSaveInput = {
      icone: req.body.icone,
      nivel: req.body.nivel,
      nome: req.body.nome,
      root: req.body.root,
      tipo: req.body.tipo,
      _id: req.body._id,
      acoes: req.body.acoes,
      tipoUsuarioAutorizado: req.body.tipoUsuarioAutorizado,
      apisRelacionadas: req.body.apisRelacionadas
    }
    await connect()

    const controllerResponse = await funcaoController.funcaoCreate(funcaoObj)

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

// export default validateHandle({ post: handle }, { validationLevel: "free" })
