import {
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandOutput,
  S3Client
} from "@aws-sdk/client-s3"
import config from "../../config"
import { multpartUploadOut } from "../../type"
const client = new S3Client({
  region: config.awsAccessRegion,
  credentials: {
    accessKeyId: config.accessKeyId || "",
    secretAccessKey: config.secretAccessKey || ""
  }
})

const createMultpartUpload = async (
  name: string
): Promise<multpartUploadOut> => {
  try {
    if (!name || name === "") throw new Error("name não pode ser vazio.")

    const multpartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: "harpy-bucket",
      Key: `INR/realease/${name}`,
      ACL: "public-read"
    })

    const response: CreateMultipartUploadCommandOutput = await client.send(
      multpartUploadCommand
    )

    if (response.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        fileId: response.UploadId,
        fileKey: response.Key
      }
    } else {
      return {
        success: false,
        fileId: undefined,
        fileKey: undefined
      }
    }
  } catch (error: any) {
    console.log(error.message)
    return {
      success: false,
      fileId: undefined,
      fileKey: undefined
    }
  }
}
export default createMultpartUpload
