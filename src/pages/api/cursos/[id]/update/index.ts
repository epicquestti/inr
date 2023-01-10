import validateHandle from "@lib/backend/validateHandle"
import cursoController from "@usecase/controller/curso"
import { cursoUpdateInput } from "@validation/Cursos/cursoUpdate"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { id }
    } = req

    const cursoObj: cursoUpdateInput = {
      id: id?.toString() || "",
      active: req.body.active,
      nome: req.body.nome,
      url: req.body.url,
      destaque: req.body.destaque
    }

    const controllerResponse = await cursoController.cursoUpdate(cursoObj)

    return res.status(200).send(controllerResponse)
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default validateHandle({ post: handle }, { validationLevel: "free" })
