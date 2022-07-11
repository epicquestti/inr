import connect from "@lib/database"
import { completeMultpartUpload } from "@lib/S3"
import FileChunks from "@schema/FileChunks"
import { NextApiRequest, NextApiResponse } from "next"

export default async function completeMultpartUploadApi(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { fileKey, fileId }
    } = req

    if (!fileKey) throw new Error("fileKey inválido.")
    if (!fileId) throw new Error("fileId inválido.")

    await connect()

    const fileList = await FileChunks.find({
      FileId: fileId.toString()
    })

    if (fileList.length <= 0) throw new Error("Arquivo não possui partes")

    const mapedArray: { ETag: string; PartNumber: number }[] = []

    for (let i = 0; i < fileList.length; i++) {
      mapedArray.push({
        ETag: fileList[i].ETag,
        PartNumber: fileList[i].PartNumber
      })
    }

    const cmpResult = await completeMultpartUpload(
      fileKey.toString(),
      fileId.toString(),
      mapedArray
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
