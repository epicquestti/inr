import { completeMultpartUpload } from "@lib/S3"
import { NextApiRequest, NextApiResponse } from "next"

export default async function completeMultpartUploadApi(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { key, uploadId },
      body
    } = req

    if (!key) throw new Error("Key inválido.")
    if (!uploadId) throw new Error("uploadId inválido")

    const cmpResult = await completeMultpartUpload(
      key.toString(),
      uploadId.toString(),
      body
    )

    if (!cmpResult.success)
      throw new Error("Erro ao finalizar o upload do arquivo.")

    return res.status(200).send({
      success: cmpResult.success,
      data: {
        location: cmpResult.location,
        key: cmpResult.key,
        ETag: cmpResult.ETag
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: error
    })
  }
}
