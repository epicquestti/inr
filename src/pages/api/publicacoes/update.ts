import validateHandle from "@lib/backend/validateHandle"
import { apiResponse } from "@lib/types/apiResponse"
import publicacoesController from "@usecase/controller/Publicacoes"
import { NextApiRequest, NextApiResponse } from "next"

async function handle(
  req: NextApiRequest,
  res: NextApiResponse<apiResponse>
): Promise<void> {
  try {
    const controller = await publicacoesController.update({
      _id: req.body._id,
      titulo: req.body.titulo,
      tipo: req.body.tipo,
      pubId: req.body.pubId,
      conteudoList: req.body.conteudoList
    })

    if (!controller.success) throw new Error(controller.message)

    res.status(200).send(controller)
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}

export default validateHandle({
  put: handle
})
