import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production this would connect to your database
const mockArmies = [
  {
    id: "army-1",
    name: "Ultramarines Strike Force",
    faction: "Space Marines",
    pointsLimit: 2000,
    totalPoints: 1850,
    units: [
      {
        id: "unit-1",
        name: "Space Marine Captain",
        category: "HQ",
        points: 90,
        stats: {
          movement: 6,
          weaponSkill: 2,
          ballisticSkill: 2,
          strength: 4,
          toughness: 4,
          wounds: 5,
          attacks: 4,
          leadership: 9,
          save: 3,
        },
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const faction = searchParams.get("faction")
    const limit = searchParams.get("limit")

    let filteredArmies = mockArmies

    if (faction) {
      filteredArmies = filteredArmies.filter((army) => army.faction.toLowerCase().includes(faction.toLowerCase()))
    }

    if (limit) {
      filteredArmies = filteredArmies.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredArmies,
      meta: {
        total: filteredArmies.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch armies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.faction) {
      return NextResponse.json({ success: false, error: "Name and faction are required" }, { status: 400 })
    }

    const newArmy = {
      id: `army-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production, save to database
    mockArmies.push(newArmy)

    return NextResponse.json({
      success: true,
      data: newArmy,
      message: "Army created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create army" }, { status: 500 })
  }
}
