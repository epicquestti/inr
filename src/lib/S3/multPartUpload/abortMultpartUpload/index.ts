import {
  AbortMultipartUploadCommand,
  AbortMultipartUploadCommandOutput,
  S3Client
} from "@aws-sdk/client-s3"
import config from "../../config"
const client = new S3Client({
  region: config.awsAccessRegion,
  credentials: {
    accessKeyId: config.accessKeyId || "",
    secretAccessKey: config.secretAccessKey || ""
  }
})

const completeMultpartUpload = async (key: string, uploadId: string) => {
  try {
    if (!key || key === "") throw new Error("key não pode ser vazio.")
    if (!uploadId || uploadId === "")
      throw new Error("uploadId não pode ser vazio.")

    const completeMultipartUploadCommand = new AbortMultipartUploadCommand({
      Bucket: "harpy-bucket",
      Key: key,
      UploadId: uploadId
    })

    const response: AbortMultipartUploadCommandOutput = await client.send(
      completeMultipartUploadCommand
    )

    if (response.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        requestCharged: response.RequestCharged
      }
    } else {
      return {
        success: false,
        requestCharged: response.RequestCharged
      }
    }
  } catch (error) {
    return {
      success: false,
      requestCharged: null
    }
  }
}

export default completeMultpartUpload
