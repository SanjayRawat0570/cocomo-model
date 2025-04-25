"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ScaleFactorsForm({ scaleFactors, onChange }) {
  const scaleFactorOptions = [
    { value: "0", label: "Very Low" },
    { value: "1", label: "Low" },
    { value: "2", label: "Nominal" },
    { value: "3", label: "High" },
    { value: "4", label: "Very High" },
    { value: "5", label: "Extra High" },
  ]

  const scaleFactorDescriptions = {
    prec: "Precedentedness (familiarity with this type of project)",
    flex: "Development flexibility (rigidity of requirements)",
    resl: "Architecture/risk resolution",
    team: "Team cohesion",
    pmat: "Process maturity",
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto max-h-[400px] pr-2">
      {Object.entries(scaleFactors).map(([factor, value]) => (
        <div key={factor}>
          <Label htmlFor={factor} className="text-sm">
            {scaleFactorDescriptions[factor]}
          </Label>
          <Select value={value.toString()} onValueChange={(value) => onChange(factor, value)}>
            <SelectTrigger id={factor} className="mt-1">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {scaleFactorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
