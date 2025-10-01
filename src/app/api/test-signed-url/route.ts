import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSignedDownloadUrl } from "@/lib/s3"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { fileName } = body

    if (!fileName) {
      return NextResponse.json({ message: "fileName is required" }, { status: 400 })
    }

    // Generate signed URL for the file
    const signedUrl = await getSignedDownloadUrl(fileName)

    return NextResponse.json({
      success: true,
      fileName: fileName,
      signedUrl: signedUrl,
      message: "Signed URL generated successfully"
    })
  } catch (error) {
    console.error("Signed URL generation error:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to generate signed URL",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
