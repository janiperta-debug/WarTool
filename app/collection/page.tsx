"use client"
import { ArrowLeft, Plus, Camera, Palette, Package, TrendingUp, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// ... existing interfaces and sample data ...

export default function CollectionPage() {
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
                  <h1 className="text-2xl font-black font-mono text-white tracking-tight">Collection Vault</h1>
                  <p className="text-sm text-white/80 font-medium">Curate your miniature empire</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                Add Model
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Camera className="h-4 w-4 mr-2" />
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="collection"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Collection
            </TabsTrigger>
            <TabsTrigger
              value="paint-schemes"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Paint Schemes
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Collection Overview */}
          <TabsContent value="collection" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="luxury-card">
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-300">Total Models</div>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-4 text-center">
                  <Palette className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-gray-300">Completed</div>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-white">$450</div>
                  <div className="text-sm text-gray-300">Current Value</div>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-white">67%</div>
                  <div className="text-sm text-gray-300">Completion</div>
                </CardContent>
              </Card>
            </div>
            {/* Add more content as needed */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
