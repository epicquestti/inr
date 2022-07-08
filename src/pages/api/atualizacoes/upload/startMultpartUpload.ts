import connect from "@lib/database"
import { createMultpartUpload } from "@lib/S3"
import AtualizacaoFile from "@schema/AtualizacaoFile"
import { NextApiRequest, NextApiResponse } from "next"
const chunkSize = 1048576
export default async function startMultpartUpload(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { fileName, size }
    } = req

    if (!fileName || fileName === "") throw new Error()
    if (!size || parseInt(size.toString()) === 0) throw new Error()

    const mpuResult = await createMultpartUpload(fileName.toString())

    if (!mpuResult.success)
      throw new Error("Erro ao iniciar o processo de upload")

    await connect()

    await AtualizacaoFile.create({
      fileId: mpuResult.fileId,
      fileKey: mpuResult.fileKey,
      state: "started"
    })

    const totalChunck =
      parseInt(size.toString()) % chunkSize == 0
        ? parseInt(size.toString()) / chunkSize
        : Math.floor(parseInt(size.toString()) / chunkSize) + 1

    return res.status(200).send({
      success: true,
      data: {
        totalChunck,
        partNumber: 1
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
