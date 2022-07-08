import {
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadCommandOutput,
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

client.middlewareStack.add(
  (next, _context) => (args: any) => {
    if (
      "string" === typeof args.request?.body &&
      args.request.body.includes("CompletedMultipartUpload")
    ) {
      console.log("AQUI==>", args.request.body)

      args.request.body = args.request.body.replace(
        /CompletedMultipartUpload/g,
        "CompleteMultipartUpload"
      )
    }
    return next(args)
  },
  {
    step: "build",
    priority: "high"
  }
)

type lt = {
  ETag: string
  PartNumber: number
}

const completeMultpartUpload = async (
  key: string,
  uploadId: string,
  list: lt[]
) => {
  try {
    if (!key || key === "") throw new Error("key não pode ser vazio.")
    if (!uploadId || uploadId === "")
      throw new Error("uploadId não pode ser vazio.")

    const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
      Bucket: config.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: list
      }
    })

    const response: CompleteMultipartUploadCommandOutput = await client.send(
      completeMultipartUploadCommand
    )

    if (response.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        key: response.Key,
        ETag: response.ETag,
        location: response.Location
      }
    } else {
      return {
        success: false,
        key: undefined,
        ETag: undefined,
        location: undefined
      }
    }
  } catch (error) {
    return {
      success: false,
      key: undefined,
      ETag: undefined,
      location: undefined
    }
  }
}

export default completeMultpartUpload
