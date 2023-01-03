import validateHandle from "@lib/backend/validateHandle"
import cursoController from "@usecase/controller/curso"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { id }
    } = req

    const cursoExists = await cursoController.cursoGetById({
      id: id?.toString() || ""
    })

    if (!cursoExists.data.id)
      throw new Error("Curso não encontrado no Banco de Dados.")

    const controllerResponse = await cursoController.cursoDelete({
      id: id?.toString() || ""
    })
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: error.message
    })
  }
}

export default validateHandle({ post: handle }, { validationLevel: "free" })
