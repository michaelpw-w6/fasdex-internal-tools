import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  })

  await s3Client.send(command)
  return fileName
}

export async function getSignedUploadUrl(fileName: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    ContentType: contentType,
  })

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export async function getSignedDownloadUrl(fileName: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
  })

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}
