import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Test webhook call
    const webhookResponse = await fetch('https://w6w.sit.waresix.ai/webhook/fasdex/update-price-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        message: "Test webhook call",
        timestamp: new Date().toISOString(),
        ...body
      })
    })

    if (!webhookResponse.ok) {
      return NextResponse.json({
        success: false,
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        message: "Webhook call failed"
      }, { status: 400 })
    }

    const responseData = await webhookResponse.text()
    
    return NextResponse.json({
      success: true,
      status: webhookResponse.status,
      message: "Webhook called successfully",
      response: responseData
    })
  } catch (error) {
    console.error("Webhook test error:", error)
    return NextResponse.json({
      success: false,
      message: "Webhook test failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
