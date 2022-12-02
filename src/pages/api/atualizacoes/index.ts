import { NextApiRequest, NextApiResponse } from "next"
import atualizacoesController from "src/usecase/controller/Atualizacoes"

interface applicationVersionsInterface {
  version: number
  major: number
  minor: number
  severity: "normal" | "urgent"
  link: string
  vigent: boolean
  publishAt?: Date
  createdAt?: Date
}

export default async function searchAtualizacoes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { version, major, minor, severity, limit, page }
    } = req

    const controller = await atualizacoesController.atualizacaoList({
      version: version?.toString() || "",
      major: major?.toString() || "",
      minor: minor?.toString() || "",
      severity: severity?.toString() || "",
      limit: limit?.toString() || "",
      page: page?.toString() || ""
    })

    if (!controller.success) throw new Error(controller.message)

    res.status(200).send({
      success: true,
      data: controller.message
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
