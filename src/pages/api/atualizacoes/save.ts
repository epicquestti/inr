import { NextApiRequest, NextApiResponse } from "next"

export default async function saveAtualizacao(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      method,
      query: { version, major, minor, severity }
    } = req

    res.status(200).send({
      success: true,
      message: "Atualização selecionada.",
      data: {}
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
