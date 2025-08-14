import { type NextRequest, NextResponse } from "next/server"

const mockCampaigns = [
  {
    id: "campaign-1",
    name: "Armageddon Crusade",
    gameSystem: "Warhammer 40K",
    startDate: "2024-01-01",
    status: "Active",
    totalBattles: 8,
    victories: 5,
    defeats: 2,
    draws: 1,
    description: "Epic campaign following the Third War for Armageddon",
    objectives: ["Capture 3 key strategic points", "Defeat Ghazghkull", "Maintain supply lines"],
    progress: 65,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
]

const mockBattleReports = [
  {
    id: "battle-1",
    campaignId: "campaign-1",
    title: "Clash at Hive Tertius",
    date: "2024-03-15",
    opponent: "Marcus",
    myArmy: "Space Marines (2000pts)",
    opponentArmy: "Orks (2000pts)",
    scenario: "Secure Primary Objectives",
    result: "Victory",
    points: 2000,
    duration: "2h 30m",
    notes:
      "Excellent positioning with Dreadnought. Ork Waaagh! caught me off guard in turn 3 but managed to hold objectives.",
    lessons: ["Deploy Dreadnought more centrally", "Watch for Ork speed", "Prioritize objective control over kills"],
    rating: 4,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const includeBattles = searchParams.get("include_battles") === "true"

    let filteredCampaigns = mockCampaigns

    if (status) {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.status === status)
    }

    const campaignsWithBattles = filteredCampaigns.map((campaign) => ({
      ...campaign,
      battles: includeBattles ? mockBattleReports.filter((battle) => battle.campaignId === campaign.id) : undefined,
    }))

    return NextResponse.json({
      success: true,
      data: campaignsWithBattles,
      meta: {
        total: filteredCampaigns.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.gameSystem) {
      return NextResponse.json({ success: false, error: "Name and game system are required" }, { status: 400 })
    }

    const newCampaign = {
      id: `campaign-${Date.now()}`,
      status: "Active",
      totalBattles: 0,
      victories: 0,
      defeats: 0,
      draws: 0,
      progress: 0,
      objectives: [],
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockCampaigns.push(newCampaign)

    return NextResponse.json({
      success: true,
      data: newCampaign,
      message: "Campaign created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create campaign" }, { status: 500 })
  }
}
