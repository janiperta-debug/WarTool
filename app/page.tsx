import { Sword, BookOpen, Package, FileText, Settings, Globe, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const modules = [
    {
      title: "Army Builder",
      description: "Craft elite forces with precision and tactical excellence",
      icon: Sword,
      href: "/army-builder",
      color: "text-accent",
    },
    {
      title: "Rules Codex",
      description: "Master the art of war with comprehensive rule management",
      icon: BookOpen,
      href: "/rules",
      color: "text-accent",
    },
    {
      title: "Collection Vault",
      description: "Curate your miniature collection with aristocratic precision",
      icon: Package,
      href: "/collection",
      color: "text-accent",
    },
    {
      title: "Campaign Chronicles",
      description: "Document your conquests and strategic victories",
      icon: FileText,
      href: "/notes",
      color: "text-accent",
    },
  ]

  return (
    <div className="min-h-screen manor-gradient">
      <header className="luxury-header sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent/30">
                <Crown className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-mono text-white tracking-tight">WarTool</h1>
                <p className="text-sm text-white/80 font-medium">Tactical Manor Wing</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Manor Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black font-mono text-white mb-6 tracking-tight drop-shadow-lg border-2 border-white/20 rounded-2xl p-6 bg-black/20 backdrop-blur-sm">
            Strategize with Precision,
            <br />
            Command with Elegance
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
            Welcome to the tactical wing of your gaming manor. Where military precision meets aristocratic refinement,
            and every strategic decision is crafted with the utmost sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Card
                key={module.title}
                className="luxury-card group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden"
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-accent/20 rounded-xl border border-accent/30 group-hover:bg-accent/30 transition-all duration-300">
                      <IconComponent className={`h-7 w-7 ${module.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-black font-mono text-white">{module.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={module.href}>
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-black font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      Enter Wing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="luxury-card border-2 border-dashed border-accent/50 hover:border-accent/70 transition-all duration-300">
            <CardContent className="p-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 bg-accent/20 rounded-xl border border-accent/30">
                  <Globe className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-black font-mono text-white">Manor Integrations</h3>
              </div>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Connect your gaming estate's applications to create a unified tactical ecosystem. Share armies across
                your manor, synchronize collections, and integrate campaign data throughout your entire tabletop domain.
              </p>
              <Link href="/integrations">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-accent/20 hover:bg-accent/30 border-accent/50 text-white font-bold px-8 py-4 rounded-xl"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Manage Estate Connections
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "0", label: "Elite Armies", color: "text-accent" },
            { value: "0", label: "Codex Entries", color: "text-accent" },
            { value: "0", label: "Curated Models", color: "text-accent" },
            { value: "0", label: "Victory Chronicles", color: "text-accent" },
          ].map((stat, index) => (
            <div key={index} className="luxury-card text-center p-6 rounded-xl">
              <div className={`text-3xl font-black font-mono ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-20 border-t border-accent/20 bg-primary/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-300 font-medium">
              Crafted for the distinguished tabletop strategist • A wing of your gaming manor
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
