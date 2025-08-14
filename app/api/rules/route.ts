import { type NextRequest, NextResponse } from "next/server"

const mockRules = [
  {
    id: "rule-1",
    title: "Line of Sight",
    category: "Core Rules",
    content:
      "A model can see a target if you can draw an unobstructed straight line from any part of its body to any part of the target's body. Models in the way that are not the target will block line of sight.",
    pageReference: "Core Rules p.12",
    tags: ["visibility", "shooting", "targeting"],
    isFavorite: true,
    customNotes: "",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const favoritesOnly = searchParams.get("favorites_only") === "true"

    let filteredRules = mockRules

    if (category && category !== "all") {
      filteredRules = filteredRules.filter((rule) => rule.category === category)
    }

    if (search) {
      filteredRules = filteredRules.filter(
        (rule) =>
          rule.title.toLowerCase().includes(search.toLowerCase()) ||
          rule.content.toLowerCase().includes(search.toLowerCase()) ||
          rule.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (favoritesOnly) {
      filteredRules = filteredRules.filter((rule) => rule.isFavorite)
    }

    return NextResponse.json({
      success: true,
      data: filteredRules,
      meta: {
        total: filteredRules.length,
        categories: ["Core Rules", "Combat", "Movement", "Psychic", "Special Rules", "Scenarios"],
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch rules" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.content || !body.category) {
      return NextResponse.json({ success: false, error: "Title, content, and category are required" }, { status: 400 })
    }

    const newRule = {
      id: `rule-${Date.now()}`,
      isFavorite: false,
      customNotes: "",
      tags: [],
      pageReference: "",
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockRules.push(newRule)

    return NextResponse.json({
      success: true,
      data: newRule,
      message: "Rule created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create rule" }, { status: 500 })
  }
}
