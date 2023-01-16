import { apiResponse } from "@lib/types/apiResponse"
import cursoController from "@usecase/controller/curso"
import { cursoCreateInput } from "@validation/Cursos/cursoCreate"
import { NextApiRequest, NextApiResponse } from "next"

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> => {
  try {
    const cursoObj: cursoCreateInput = {
      active: req.body.active,
      nome: req.body.nome,
      url: req.body.url,
      destaque: req.body.destaque
    }

    const controllerResponse = await cursoController.cursoCreate(cursoObj)

    return res.status(200).send(controllerResponse)
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

// export default validateHandle({ post: handle }, { validationLevel: "free" })
