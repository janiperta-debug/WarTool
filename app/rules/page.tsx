"use client"

import { useState } from "react"
import { ArrowLeft, Search, BookOpen, Star, Plus, Edit3, Bookmark, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Rule {
  id: string
  title: string
  category: "Core Rules" | "Combat" | "Movement" | "Psychic" | "Special Rules" | "Scenarios"
  content: string
  pageReference: string
  tags: string[]
  isFavorite: boolean
  customNotes?: string
}

interface QuickReference {
  id: string
  title: string
  summary: string
  category: string
}

const sampleRules: Rule[] = [
  {
    id: "line-of-sight",
    title: "Line of Sight",
    category: "Core Rules",
    content:
      "A model can see a target if you can draw an unobstructed straight line from any part of its body to any part of the target's body. Models in the way that are not the target will block line of sight.",
    pageReference: "Core Rules p.12",
    tags: ["visibility", "shooting", "targeting"],
    isFavorite: true,
  },
  {
    id: "charge-phase",
    title: "Charge Phase",
    category: "Movement",
    content:
      "In the Charge phase, units can attempt to charge enemy units. Roll 2D6 and add the result to determine charge distance. The charging unit must end within 1 inch of the target.",
    pageReference: "Core Rules p.24",
    tags: ["charge", "movement", "combat"],
    isFavorite: false,
  },
  {
    id: "overwatch",
    title: "Overwatch",
    category: "Combat",
    content:
      "When a unit is charged, it may fire Overwatch. Roll to hit on 6s only, regardless of Ballistic Skill. Overwatch cannot cause morale tests.",
    pageReference: "Core Rules p.28",
    tags: ["shooting", "charge", "reaction"],
    isFavorite: true,
  },
  {
    id: "morale-test",
    title: "Morale Test",
    category: "Core Rules",
    content:
      "When a unit suffers casualties, it must take a Morale test. Roll 1D6 and add the number of models lost. If the result exceeds the unit's Leadership, the test is failed.",
    pageReference: "Core Rules p.35",
    tags: ["morale", "leadership", "casualties"],
    isFavorite: false,
  },
]

const quickReferences: QuickReference[] = [
  {
    id: "weapon-types",
    title: "Weapon Types",
    summary: "Assault: Move and shoot / Rapid Fire: Double shots at half range / Heavy: -1 to hit if moved",
    category: "Combat",
  },
  {
    id: "cover-saves",
    title: "Cover Saves",
    summary: "Light Cover: +1 to armor save / Heavy Cover: +2 to armor save / Must be 25% obscured",
    category: "Core Rules",
  },
  {
    id: "vehicle-damage",
    title: "Vehicle Damage",
    summary: "1-2: Shaken / 3-4: Stunned / 5: Weapon Destroyed / 6: Immobilized / 7+: Destroyed",
    category: "Combat",
  },
]

export default function RulesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [rules, setRules] = useState<Rule[]>(sampleRules)
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null)

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || rule.category === selectedCategory
    const matchesFavorites = !showFavoritesOnly || rule.isFavorite

    return matchesSearch && matchesCategory && matchesFavorites
  })

  const toggleFavorite = (ruleId: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, isFavorite: !rule.isFavorite } : rule)))
  }

  const updateCustomNotes = (ruleId: string, notes: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, customNotes: notes } : rule)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Core Rules":
        return "bg-blue-100 text-blue-800"
      case "Combat":
        return "bg-red-100 text-red-800"
      case "Movement":
        return "bg-green-100 text-green-800"
      case "Psychic":
        return "bg-purple-100 text-purple-800"
      case "Special Rules":
        return "bg-yellow-100 text-yellow-800"
      case "Scenarios":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen manor-gradient">
      {/* Header */}
      <header className="luxury-header sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Manor
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent/30">
                  <Crown className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-black font-mono text-white tracking-tight">Rules Codex</h1>
                  <p className="text-sm text-white/80 font-medium">Master the art of war</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="rules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="rules"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Rule Library
            </TabsTrigger>
            <TabsTrigger
              value="quick-ref"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Quick Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search and Filters */}
              <div className="lg:col-span-1">
                <Card className="luxury-card mb-6">
                  <CardHeader>
                    <CardTitle className="font-mono text-white">Search & Filter</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="search" className="text-gray-200">
                        Search Rules
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Search by title, content, or tags..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-gray-200">
                        Category
                      </Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all" className="text-white hover:bg-gray-700">
                            All Categories
                          </SelectItem>
                          <SelectItem value="Core Rules" className="text-white hover:bg-gray-700">
                            Core Rules
                          </SelectItem>
                          <SelectItem value="Combat" className="text-white hover:bg-gray-700">
                            Combat
                          </SelectItem>
                          <SelectItem value="Movement" className="text-white hover:bg-gray-700">
                            Movement
                          </SelectItem>
                          <SelectItem value="Psychic" className="text-white hover:bg-gray-700">
                            Psychic
                          </SelectItem>
                          <SelectItem value="Special Rules" className="text-white hover:bg-gray-700">
                            Special Rules
                          </SelectItem>
                          <SelectItem value="Scenarios" className="text-white hover:bg-gray-700">
                            Scenarios
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Rule Stats */}
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-mono text-white">Library Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-200">Total Rules:</span>
                        <span className="font-bold text-white">{rules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-200">Favorites:</span>
                        <span className="font-bold text-yellow-400">{rules.filter((r) => r.isFavorite).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-200">With Notes:</span>
                        <span className="font-bold text-blue-400">{rules.filter((r) => r.customNotes).length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rules List */}
              <div className="lg:col-span-1">
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-mono text-white">Rules Library</CardTitle>
                    <CardDescription className="text-gray-300">
                      {filteredRules.length} rule{filteredRules.length !== 1 ? "s" : ""} found
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredRules.map((rule) => (
                        <Card
                          key={rule.id}
                          className={`luxury-card p-3 cursor-pointer transition-all hover:shadow-md ${
                            selectedRule?.id === rule.id ? "ring-2 ring-accent" : ""
                          }`}
                          onClick={() => setSelectedRule(rule)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{rule.title}</h4>
                                <Badge className={getCategoryColor(rule.category)}>{rule.category}</Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-2">{rule.pageReference}</p>
                              <div className="flex flex-wrap gap-1">
                                {rule.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-gray-500 text-gray-300">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-300 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(rule.id)
                              }}
                            >
                              <Star className={`h-4 w-4 ${rule.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rule Detail */}
              <div className="lg:col-span-1">
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-mono text-white">Rule Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedRule ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{selectedRule.title}</h3>
                            <Badge className={getCategoryColor(selectedRule.category)}>{selectedRule.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{selectedRule.pageReference}</p>
                          <p className="text-sm leading-relaxed text-gray-200">{selectedRule.content}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-white">Tags</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedRule.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-gray-500 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="custom-notes" className="text-gray-200">
                            Custom Notes
                          </Label>
                          <Textarea
                            id="custom-notes"
                            placeholder="Add your interpretations, clarifications, or house rules..."
                            value={selectedRule.customNotes || ""}
                            onChange={(e) => updateCustomNotes(selectedRule.id, e.target.value)}
                            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-gray-200 hover:bg-white/10 hover:text-white bg-transparent"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Rule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-gray-200 hover:bg-white/10 hover:text-white bg-transparent"
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Quick Access
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-300">Select a rule to view details</p>
                        <p className="text-sm text-gray-400">Click on any rule from the library</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quick-ref" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickReferences.map((ref) => (
                <Card key={ref.id} className="luxury-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-mono text-white">{ref.title}</CardTitle>
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {ref.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-200">{ref.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
