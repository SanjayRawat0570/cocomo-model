"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { calculateBasicCocomo, calculateIntermediateCocomo, calculateDetailedCocomo } from "@/lib/cocomo-calculations"
import { ResultsDisplay } from "@/components/results-display"
import { CostFactorsForm } from "@/components/cost-factors-form"
import { ScaleFactorsForm } from "@/components/scale-factors-form"

export function CocomoCalculator() {
  const [activeTab, setActiveTab] = useState("basic")
  const [projectSize, setProjectSize] = useState(10)
  const [projectType, setProjectType] = useState("organic")
  const [laborRate, setLaborRate] = useState(50000)

  // For Intermediate COCOMO
  const [costDrivers, setCostDrivers] = useState({
    rely: 1.0, // Required software reliability
    data: 1.0, // Database size
    cplx: 1.0, // Product complexity
    time: 1.0, // Execution time constraint
    stor: 1.0, // Main storage constraint
    virt: 1.0, // Virtual machine volatility
    turn: 1.0, // Computer turnaround time
    acap: 1.0, // Analyst capability
    aexp: 1.0, // Applications experience
    pcap: 1.0, // Programmer capability
    vexp: 1.0, // Virtual machine experience
    lexp: 1.0, // Programming language experience
    modp: 1.0, // Modern programming practices
    tool: 1.0, // Use of software tools
    sced: 1.0, // Required development schedule
  })

  // For Detailed COCOMO
  const [scaleFactors, setScaleFactors] = useState({
    prec: 3, // Precedentedness
    flex: 3, // Development flexibility
    resl: 3, // Architecture / risk resolution
    team: 3, // Team cohesion
    pmat: 3, // Process maturity
  })

  const [results, setResults] = useState({
    effort: 0,
    duration: 0,
    staffing: 0,
    cost: 0,
  })

  useEffect(() => {
    calculateResults()
  }, [activeTab, projectSize, projectType, costDrivers, scaleFactors, laborRate])

  const calculateResults = () => {
    let calculatedResults

    switch (activeTab) {
      case "basic":
        calculatedResults = calculateBasicCocomo(projectSize, projectType, laborRate)
        break
      case "intermediate":
        calculatedResults = calculateIntermediateCocomo(projectSize, projectType, costDrivers, laborRate)
        break
      case "detailed":
        calculatedResults = calculateDetailedCocomo(projectSize, scaleFactors, costDrivers, laborRate)
        break
      default:
        calculatedResults = { effort: 0, duration: 0, staffing: 0, cost: 0 }
    }

    setResults(calculatedResults)
  }

  const handleCostDriverChange = (factor, value) => {
    setCostDrivers((prev) => ({
      ...prev,
      [factor]: Number.parseFloat(value),
    }))
  }

  const handleScaleFactorChange = (factor, value) => {
    setScaleFactors((prev) => ({
      ...prev,
      [factor]: Number.parseInt(value),
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project COCOMO Calculator</CardTitle>
        <CardDescription>
          Estimate software development effort, duration, and cost using the Constructive Cost Model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic COCOMO</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate COCOMO</TabsTrigger>
            <TabsTrigger value="detailed">Detailed COCOMO</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-size">Project Size (KLOC)</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      id="project-size"
                      min={1}
                      max={1000}
                      step={1}
                      value={[projectSize]}
                      onValueChange={(value) => setProjectSize(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={projectSize}
                      onChange={(e) => setProjectSize(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>

                {activeTab !== "detailed" && (
                  <div>
                    <Label htmlFor="project-type">Project Type</Label>
                    <Select value={projectType} onValueChange={setProjectType}>
                      <SelectTrigger id="project-type" className="mt-2">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic (Simple)</SelectItem>
                        <SelectItem value="semi-detached">Semi-detached (Medium)</SelectItem>
                        <SelectItem value="embedded">Embedded (Complex)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="labor-rate">Annual Labor Rate ($)</Label>
                  <Input
                    id="labor-rate"
                    type="number"
                    value={laborRate}
                    onChange={(e) => setLaborRate(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
              </div>

              <TabsContent value="basic" className="mt-0">
                <div className="bg-muted/50 p-4 rounded-md h-full flex items-center justify-center">
                  <p className="text-center text-muted-foreground">
                    Basic COCOMO uses only project size and type to estimate effort and duration.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="intermediate" className="mt-0">
                <CostFactorsForm costDrivers={costDrivers} onChange={handleCostDriverChange} />
              </TabsContent>

              <TabsContent value="detailed" className="mt-0">
                <ScaleFactorsForm scaleFactors={scaleFactors} onChange={handleScaleFactorChange} />
              </TabsContent>
            </div>

            <ResultsDisplay results={results} />
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
