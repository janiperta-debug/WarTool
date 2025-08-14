"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Globe, CheckCircle, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface IntegrationStatus {
  apiVersion: string
  status: string
  endpoints: Record<string, string>
  capabilities: string[]
  supportedFormats: string[]
  authentication: {
    type: string
    headerName: string
    required: boolean
  }
  rateLimit: {
    requests: number
    window: string
  }
  lastUpdated: string
}

export default function IntegrationsPage() {
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus | null>(null)
  const [apiKey, setApiKey] = useState("wt_live_1234567890abcdef")
  const [testEndpoint, setTestEndpoint] = useState("/api/armies")
  const [testResult, setTestResult] = useState<string>("")

  useEffect(() => {
    fetchIntegrationStatus()
  }, [])

  const fetchIntegrationStatus = async () => {
    try {
      const response = await fetch("/api/integration/status")
      const data = await response.json()
      if (data.success) {
        setIntegrationStatus(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch integration status:", error)
    }
  }

  const testApiEndpoint = async () => {
    try {
      const response = await fetch(testEndpoint, {
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult(`Error: ${error}`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateApiKey = () => {
    const newKey = `wt_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(newKey)
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
                  <h1 className="text-2xl font-black font-mono text-white tracking-tight">Manor Integrations</h1>
                  <p className="text-sm text-white/80 font-medium">Connect your tabletop universe</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {integrationStatus && (
                <Badge className={integrationStatus.status === "active" ? "bg-green-100 text-green-800" : ""}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {integrationStatus.status}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="overview"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="endpoints"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              API Endpoints
            </TabsTrigger>
            <TabsTrigger
              value="authentication"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Auth & Keys
            </TabsTrigger>
            <TabsTrigger
              value="testing"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              API Testing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="luxury-card border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5 text-accent" />
                  GameTable.site Integration
                </CardTitle>
                <CardDescription>Perfect companion to your existing tabletop platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Seamless Connections</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Share army lists with game sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Link battle reports to events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Collection milestones unlock trophies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Player matching with army preferences</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Integration Examples</h4>
                    <div className="bg-white/50 rounded-lg p-3 text-xs font-mono">
                      <div className="text-green-600">// Share army to game session</div>
                      <div>POST /api/armies/share</div>
                      <div className="text-slate-600">{"{"}</div>
                      <div className="ml-2">"armyId": "army_123",</div>
                      <div className="ml-2">"gameSessionId": "gs_456",</div>
                      <div className="ml-2">"platform": "gametable.site"</div>
                      <div className="text-slate-600">{"}"}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit GameTable.site
                  </Button>
                  <Button size="sm" variant="outline">
                    View Integration Docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
