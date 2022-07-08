import { uploadPart } from "@lib/S3"
import { NextApiRequest, NextApiResponse } from "next"

export default async function uploadMultpart(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { partNumber, key, uploadId },
      body
    } = req

    let buffer = Buffer.from(JSON.stringify(body))
    let arraybuffer = Uint8Array.from(buffer)

    const parsedPartNumber = parseInt(partNumber.toString())

    if (!parsedPartNumber || parsedPartNumber <= 0)
      throw new Error("Erro ao dividir arquivo.")
    if (!key) throw new Error("Key inválido.")
    if (!uploadId) throw new Error("uploadId inválido")

    const mpuResult = await uploadPart(
      parsedPartNumber,
      key.toString(),
      uploadId.toString(),
      arraybuffer
    )

    if (!mpuResult.success)
      throw new Error("Erro ao realizar o upload de uma das partes do arquivo.")

    return res.status(200).send({
      success: mpuResult.success,
      data: {
        ETag: mpuResult.ETag,
        partNumber: mpuResult.partNumber
      }
    })
  } catch (error: any) {
    console.log(error)

    res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
