import { createMultpartUpload } from "@lib/S3"
import { NextApiRequest, NextApiResponse } from "next"
export default async function startMultpartUpload(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { fileName }
    } = req

    if (!fileName || fileName === "") throw new Error("File name ausente")

    const mpuResult = await createMultpartUpload(fileName.toString())

    if (!mpuResult.success)
      throw new Error("Erro ao iniciar o processo de upload")

    return res.status(200).send({
      success: mpuResult.success,
      data: {
        fileId: mpuResult.fileId,
        fileKey: mpuResult.fileKey
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
