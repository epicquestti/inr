import { abortMultpartUpload } from "@lib/S3"
import { NextApiRequest, NextApiResponse } from "next"

export default async function abortMultpartUploadApi(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { key, uploadId }
    } = req

    if (!key) throw new Error("Key inválido.")
    if (!uploadId) throw new Error("uploadId inválido")

    const ampResult = await abortMultpartUpload(
      key.toString(),
      uploadId.toString()
    )

    if (!ampResult.success)
      throw new Error("Erro ao abortar o upload do arquivo.")

    return res.status(200).send({
      success: ampResult.success,
      data: {
        requestCharged: ampResult.requestCharged
      }
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: error
    })
  }
}
