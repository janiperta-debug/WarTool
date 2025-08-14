"use client"
import { ArrowLeft, Plus, Calendar, Trophy, Target, Camera, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// ... existing interfaces and sample data ...

export default function NotesPage() {
  // ... existing state and functions ...

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
                  <h1 className="text-2xl font-black font-mono text-white tracking-tight">Campaign Chronicles</h1>
                  <p className="text-sm text-white/80 font-medium">Document your tactical journey</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="campaigns"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="battles"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Battle Reports
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Strategy Notes
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Progress Overview */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="luxury-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <div className="text-3xl font-bold text-white">15</div>
                  <div className="text-sm text-gray-300">Total Victories</div>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <div className="text-3xl font-bold text-white">23</div>
                  <div className="text-sm text-gray-300">Battles Fought</div>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <div className="text-3xl font-bold text-white">65%</div>
                  <div className="text-sm text-gray-300">Win Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
