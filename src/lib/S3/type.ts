export type multpartUploadOut = {
  success: boolean
  fileId: string | undefined
  fileKey: string | undefined
}

export type UploadPartOut = {
  success: boolean
  partNumber: number
  ETag: string
}

export type completeMultpartUpload = {
  success: boolean
  key: string | undefined
  ETag: string | undefined
  location: string | undefined
}
