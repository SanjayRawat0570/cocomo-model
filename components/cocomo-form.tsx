"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateResults } from "@/app/actions"
import { ResultsDisplay } from "@/components/results-display"

export function CocomoForm({ defaultResults }) {
  const [size, setSize] = useState<number>(10)
  const [projectType, setProjectType] = useState<"organic" | "semi-detached" | "embedded">("organic")
  const [useCustomCoefficients, setUseCustomCoefficients] = useState<boolean>(false)
  const [results, setResults] = useState(defaultResults)
  const [isCalculating, setIsCalculating] = useState(false)

  // Custom coefficients with default values from organic type
  const [coefficientA, setCoefficientA] = useState<number>(2.4)
  const [coefficientB, setCoefficientB] = useState<number>(1.05)
  const [coefficientC, setCoefficientC] = useState<number>(2.5)
  const [coefficientD, setCoefficientD] = useState<number>(0.38)

  // Update results using server action
  const updateResults = async () => {
    setIsCalculating(true)
    try {
      const newResults = await calculateResults({
        size,
        projectType,
        useCustomCoefficients,
        coefficients: {
          a: coefficientA,
          b: coefficientB,
          c: coefficientC,
          d: coefficientD,
        },
      })
      setResults(newResults)
    } catch (error) {
      console.error("Error calculating results:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleSizeChange = async (e) => {
    const newSize = Number.parseFloat(e.target.value) || 0
    setSize(newSize)
    // Debounce to avoid too many server calls
    setTimeout(updateResults, 300)
  }

  const handleTypeChange = async (value) => {
    setProjectType(value)

    // Update coefficient defaults based on selected project type
    const coefficients = {
      organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
      "semi-detached": { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
      embedded: { a: 3.6, b: 1.2, c: 2.5, d: 0.32 },
    }

    setCoefficientA(coefficients[value].a)
    setCoefficientB(coefficients[value].b)
    setCoefficientC(coefficients[value].c)
    setCoefficientD(coefficients[value].d)

    setTimeout(updateResults, 300)
  }

  const handleCoefficientChange = async (coefficient, e) => {
    const value = Number.parseFloat(e.target.value) || 0

    switch (coefficient) {
      case "a":
        setCoefficientA(value)
        break
      case "b":
        setCoefficientB(value)
        break
      case "c":
        setCoefficientC(value)
        break
      case "d":
        setCoefficientD(value)
        break
    }

    if (useCustomCoefficients) {
      setTimeout(updateResults, 300)
    }
  }

  const toggleCustomCoefficients = (value) => {
    setUseCustomCoefficients(value === "custom")
    setTimeout(updateResults, 300)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Parameters</CardTitle>
        <CardDescription>Enter your project size and select the project type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="size">Project Size (KLOC)</Label>
          <Input id="size" type="number" min="0.1" step="0.1" value={size} onChange={handleSizeChange} />
          <p className="text-xs text-muted-foreground">KLOC = Thousands of Lines of Code</p>
        </div>

        <Tabs defaultValue="standard" className="w-full" onValueChange={toggleCustomCoefficients}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="standard">Standard Models</TabsTrigger>
              <TabsTrigger value="custom">Custom Coefficients</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={projectType} onValueChange={handleTypeChange}>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic (Small teams, familiar with project)</SelectItem>
                  <SelectItem value="semi-detached">Semi-detached (Medium teams, mixed experience)</SelectItem>
                  <SelectItem value="embedded">Embedded (Complex projects, tight constraints)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <Label className="text-xs">Coefficient a</Label>
                <p className="text-sm font-medium">{coefficientA}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Coefficient b</Label>
                <p className="text-sm font-medium">{coefficientB}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Coefficient c</Label>
                <p className="text-sm font-medium">{coefficientC}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Coefficient d</Label>
                <p className="text-sm font-medium">{coefficientD}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coefficient-a">Coefficient a</Label>
                <Input
                  id="coefficient-a"
                  type="number"
                  step="0.1"
                  value={coefficientA}
                  onChange={(e) => handleCoefficientChange("a", e)}
                />
                <p className="text-xs text-muted-foreground">For effort calculation</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coefficient-b">Coefficient b</Label>
                <Input
                  id="coefficient-b"
                  type="number"
                  step="0.01"
                  value={coefficientB}
                  onChange={(e) => handleCoefficientChange("b", e)}
                />
                <p className="text-xs text-muted-foreground">For effort calculation</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coefficient-c">Coefficient c</Label>
                <Input
                  id="coefficient-c"
                  type="number"
                  step="0.1"
                  value={coefficientC}
                  onChange={(e) => handleCoefficientChange("c", e)}
                />
                <p className="text-xs text-muted-foreground">For duration calculation</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coefficient-d">Coefficient d</Label>
                <Input
                  id="coefficient-d"
                  type="number"
                  step="0.01"
                  value={coefficientD}
                  onChange={(e) => handleCoefficientChange("d", e)}
                />
                <p className="text-xs text-muted-foreground">For duration calculation</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <ResultsDisplay results={results} isCalculating={isCalculating} />
      </CardContent>
    </Card>
  )
}
