import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { uploadToS3, getSignedDownloadUrl } from "@/lib/s3"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only PDF and image files are allowed." },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size must be less than 10MB" },
        { status: 400 }
      )
    }

    // Upload to S3
    const fileName = await uploadToS3(file)

    // Get signed URL for the uploaded file
    const signedUrl = await getSignedDownloadUrl(fileName)

    // Call the webhook API
    try {
      const webhookResponse = await fetch('https://w6w.sit.waresix.ai/webhook/fasdex/update-price-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signedUrl: signedUrl,
          fileName: fileName,
          originalFileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadedBy: session.user?.email,
          uploadedAt: new Date().toISOString()
        })
      })

      if (!webhookResponse.ok) {
        console.error('Webhook call failed:', webhookResponse.status, webhookResponse.statusText)
        // Don't fail the upload if webhook fails, just log it
      } else {
        console.log('Webhook called successfully')
      }
    } catch (webhookError) {
      console.error('Webhook error:', webhookError)
      // Don't fail the upload if webhook fails, just log it
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: fileName,
      signedUrl: signedUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
