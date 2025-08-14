"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Save, Download, Users, Zap, Shield, Sword, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Sample units data
const sampleUnits = [
  {
    id: 1,
    name: "Space Marine Sergeant",
    category: "HQ",
    points: 100,
    stats: {
      movement: 6,
      weaponSkill: 4,
      ballisticSkill: 4,
      strength: 4,
      toughness: 4,
      wounds: 1,
      attacks: 1,
      leadership: 9,
      save: 3,
    },
    equipment: ["Power Sword", "Combi Plasma"],
  },
  {
    id: 2,
    name: "Space Marine Tactical Squad",
    category: "Troops",
    points: 300,
    stats: {
      movement: 6,
      weaponSkill: 3,
      ballisticSkill: 3,
      strength: 4,
      toughness: 4,
      wounds: 1,
      attacks: 1,
      leadership: 7,
      save: 3,
    },
    equipment: ["Lasguns", "Combi Grenade"],
  },
  // ... other units
]

// Function to get category icon
const getCategoryIcon = (category) => {
  switch (category) {
    case "HQ":
      return <Shield className="h-4 w-4" />
    case "Troops":
      return <Users className="h-4 w-4" />
    case "Elites":
      return <Zap className="h-4 w-4" />
    case "Fast Attack":
      return <Sword className="h-4 w-4" />
    case "Heavy Support":
      return <Shield className="h-4 w-4" />
    case "Flyer":
      return <Crown className="h-4 w-4" />
    default:
      return null
  }
}

export default function ArmyBuilderPage() {
  const [armyList, setArmyList] = useState({ name: "", faction: "", pointsLimit: 2000, units: [] })
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Calculate total points
  const totalPoints = armyList.units.reduce((acc, unit) => acc + unit.points, 0)

  // Calculate remaining points
  const remainingPoints = armyList.pointsLimit - totalPoints

  // Filter units based on selected category
  const filteredUnits =
    selectedCategory === "all" ? sampleUnits : sampleUnits.filter((unit) => unit.category === selectedCategory)

  // Function to remove unit from army
  const removeUnitFromArmy = (unitId) => {
    setArmyList((prev) => ({
      ...prev,
      units: prev.units.filter((unit) => unit.id !== unitId),
    }))
  }

  return (
    <div className="min-h-screen manor-gradient">
      {/* Header */}
      <header className="luxury-header sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Manor
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent/30">
                  <Sword className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h1 className="text-3xl font-black font-mono text-white tracking-tight">Army Builder</h1>
                  <p className="text-sm text-white/80 font-medium">Forge Elite Forces</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Save className="h-4 w-4 mr-2" />
                Save Army
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Army Configuration */}
          <div className="lg:col-span-1">
            <Card className="luxury-card mb-6">
              <CardHeader>
                <CardTitle className="font-black font-mono text-white text-xl">Army Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="army-name" className="text-gray-200 font-semibold">
                    Army Name
                  </Label>
                  <Input
                    id="army-name"
                    value={armyList.name}
                    onChange={(e) => setArmyList((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter army name"
                    className="bg-white/50 border-accent/30 focus:border-accent"
                  />
                </div>
                <div>
                  <Label htmlFor="faction" className="text-gray-200 font-semibold">
                    Faction
                  </Label>
                  <Select
                    value={armyList.faction}
                    onValueChange={(value) => setArmyList((prev) => ({ ...prev, faction: value }))}
                  >
                    <SelectTrigger className="bg-white/50 border-accent/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Space Marines">Space Marines</SelectItem>
                      <SelectItem value="Imperial Guard">Imperial Guard</SelectItem>
                      <SelectItem value="Orks">Orks</SelectItem>
                      <SelectItem value="Eldar">Eldar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="points-limit" className="text-gray-200 font-semibold">
                    Points Limit
                  </Label>
                  <Input
                    id="points-limit"
                    type="number"
                    value={armyList.pointsLimit}
                    onChange={(e) =>
                      setArmyList((prev) => ({ ...prev, pointsLimit: Number.parseInt(e.target.value) || 2000 }))
                    }
                    className="bg-white/50 border-accent/30 focus:border-accent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Points Summary */}
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="font-black font-mono text-white text-xl">Points Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-200 font-medium">Total Points:</span>
                    <span className="font-bold text-accent">{totalPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200 font-medium">Points Limit:</span>
                    <span className="font-medium text-white">{armyList.pointsLimit}</span>
                  </div>
                  <Separator className="bg-accent/20" />
                  <div className="flex justify-between">
                    <span className="text-gray-200 font-medium">Remaining:</span>
                    <span className={`font-bold ${remainingPoints < 0 ? "text-red-400" : "text-accent"}`}>
                      {remainingPoints}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        totalPoints > armyList.pointsLimit ? "bg-red-500" : "bg-accent"
                      }`}
                      style={{ width: `${Math.min((totalPoints / armyList.pointsLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unit Selection */}
          <div className="lg:col-span-1">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="font-black font-mono text-white text-xl">Available Units</CardTitle>
                <CardDescription className="text-gray-300">Select units to add to your army</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white/50 border-accent/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="HQ">HQ</SelectItem>
                      <SelectItem value="Troops">Troops</SelectItem>
                      <SelectItem value="Elites">Elites</SelectItem>
                      <SelectItem value="Fast Attack">Fast Attack</SelectItem>
                      <SelectItem value="Heavy Support">Heavy Support</SelectItem>
                      <SelectItem value="Flyer">Flyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {filteredUnits.map((unit) => (
                    <Card key={unit.id} className="luxury-card p-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white">{unit.name}</h4>
                            <Badge className="bg-accent/20 text-accent border-accent/30">
                              {getCategoryIcon(unit.category)}
                              {unit.category}
                            </Badge>
                          </div>
                          <p className="text-sm font-bold text-accent mb-2">{unit.points} pts</p>
                          <div className="text-xs text-gray-300 font-mono">
                            M{unit.stats.movement}" WS{unit.stats.weaponSkill}+ BS{unit.stats.ballisticSkill}+ S
                            {unit.stats.strength} T{unit.stats.toughness} W{unit.stats.wounds} A{unit.stats.attacks} Ld
                            {unit.stats.leadership} Sv{unit.stats.save}+
                          </div>
                        </div>
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Army List */}
          <div className="lg:col-span-1">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="font-black font-mono text-white text-xl">Current Army List</CardTitle>
                <CardDescription className="text-gray-300">
                  {armyList.name} - {armyList.faction}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {armyList.units.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">No units selected</p>
                    <p className="text-sm">Add units from the selection panel</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {armyList.units.map((unit) => (
                      <Card key={unit.id} className="luxury-card p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-white">{unit.name}</h4>
                              <Badge className="bg-accent/20 text-accent border-accent/30">
                                {getCategoryIcon(unit.category)}
                                {unit.category}
                              </Badge>
                            </div>
                            <p className="text-sm font-bold text-accent">{unit.points} pts</p>
                            <div className="text-xs text-gray-300 mt-1">
                              {unit.equipment.slice(0, 2).join(", ")}
                              {unit.equipment.length > 2 && "..."}
                            </div>
                          </div>
                          <Button size="sm" variant="destructive" onClick={() => removeUnitFromArmy(unit.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
