import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const integrationStatus = {
      apiVersion: "1.0.0",
      status: "active",
      endpoints: {
        armies: "/api/armies",
        collection: "/api/collection",
        campaigns: "/api/campaigns",
        rules: "/api/rules",
      },
      capabilities: [
        "Army list management",
        "Collection tracking",
        "Campaign progress",
        "Rules database",
        "Battle reports",
        "Real-time sync",
      ],
      supportedFormats: ["JSON", "REST"],
      authentication: {
        type: "API Key",
        headerName: "X-API-Key",
        required: false, // Set to true in production
      },
      rateLimit: {
        requests: 1000,
        window: "1 hour",
      },
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: integrationStatus,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to get integration status" }, { status: 500 })
  }
}
