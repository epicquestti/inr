import {
  S3Client,
  UploadPartCommand,
  UploadPartCommandOutput
} from "@aws-sdk/client-s3"
import { UploadPartOut } from "@lib/S3/type"
import config from "../../config"
const client = new S3Client({
  region: config.awsAccessRegion,
  credentials: {
    accessKeyId: config.accessKeyId || "",
    secretAccessKey: config.secretAccessKey || ""
  }
})

const uploadPart = async (
  partNumber: number,
  key: string,
  uploadId: string,
  part: Blob
): Promise<UploadPartOut> => {
  try {
    if (!partNumber || partNumber <= 0)
      throw new Error("partNumber não pode ser vazio.")
    if (!key || key === "") throw new Error("key não pode ser vazio.")
    if (!uploadId || uploadId === "")
      throw new Error("uploadId não pode ser vazio.")

    const multpartUploadCommand = new UploadPartCommand({
      Bucket: "harpy-bucket",
      ContentLength: part.size,
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: part
    })

    const response: UploadPartCommandOutput = await client.send(
      multpartUploadCommand
    )

    if (response.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        partNumber: partNumber,
        ETag: response.ETag || ""
      }
    } else {
      return {
        success: false,
        partNumber: 0,
        ETag: ""
      }
    }
  } catch (error: any) {
    console.log(error.message)
    return {
      success: false,
      partNumber: 0,
      ETag: ""
    }
  }
}

export default uploadPart
