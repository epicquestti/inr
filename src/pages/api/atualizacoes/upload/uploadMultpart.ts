import connect from "@lib/database"
import { uploadPart } from "@lib/S3"
import FileChunks from "@schema/FileChunks"
import { NextApiRequest, NextApiResponse } from "next"
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb"
    }
  }
}
export default async function uploadMultpart(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { partNumber, fileKey, fileId },
      body
    } = req
    const parsedPartNumber = parseInt(partNumber.toString())

    if (!parsedPartNumber || parsedPartNumber <= 0)
      throw new Error("Erro ao dividir arquivo.")

    // let buffer = Buffer.from(JSON.stringify(body))
    // let arraybuffer = Uint8Array.from(buffer)

    const a: Blob = new Blob(body)
    console.log(a.size)

    const mpuResult = await uploadPart(
      parsedPartNumber,
      fileKey.toString(),
      fileId.toString(),
      body
    )

    if (!mpuResult.success)
      throw new Error("Erro ao realizar o upload de uma das partes do arquivo.")

    await connect()

    await FileChunks.create({
      FileId: fileId,
      ETag: mpuResult.ETag,
      PartNumber: parsedPartNumber
    })

    return res.status(200).send({
      success: mpuResult.success
    })
  } catch (error: any) {
    res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
