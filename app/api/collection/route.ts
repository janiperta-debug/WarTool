import { type NextRequest, NextResponse } from "next/server"

const mockCollection = [
  {
    id: "model-1",
    name: "Space Marine Captain",
    faction: "Space Marines",
    category: "HQ",
    status: "Completed",
    paintScheme: "Ultramarines Blue",
    purchasePrice: 25,
    currentValue: 30,
    purchaseDate: "2024-01-15",
    priority: "High",
    notes: "First attempt at edge highlighting. Turned out well!",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const faction = searchParams.get("faction")

    let filteredCollection = mockCollection

    if (status) {
      filteredCollection = filteredCollection.filter((model) => model.status === status)
    }

    if (faction) {
      filteredCollection = filteredCollection.filter((model) =>
        model.faction.toLowerCase().includes(faction.toLowerCase()),
      )
    }

    const stats = {
      totalModels: mockCollection.length,
      completedModels: mockCollection.filter((m) => m.status === "Completed").length,
      totalValue: mockCollection.reduce((sum, m) => sum + m.currentValue, 0),
      totalInvestment: mockCollection.reduce((sum, m) => sum + m.purchasePrice, 0),
    }

    return NextResponse.json({
      success: true,
      data: filteredCollection,
      stats,
      meta: {
        total: filteredCollection.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch collection" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.faction) {
      return NextResponse.json({ success: false, error: "Name and faction are required" }, { status: 400 })
    }

    const newModel = {
      id: `model-${Date.now()}`,
      status: "Unassembled",
      priority: "Medium",
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockCollection.push(newModel)

    return NextResponse.json({
      success: true,
      data: newModel,
      message: "Model added to collection successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add model to collection" }, { status: 500 })
  }
}
