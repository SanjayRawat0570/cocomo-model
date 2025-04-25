"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CostFactorsForm({ costDrivers, onChange }) {
  const costDriverOptions = {
    rely: [
      { value: "0.75", label: "Very Low" },
      { value: "0.88", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.15", label: "High" },
      { value: "1.40", label: "Very High" },
    ],
    data: [
      { value: "0.94", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.08", label: "High" },
      { value: "1.16", label: "Very High" },
    ],
    cplx: [
      { value: "0.70", label: "Very Low" },
      { value: "0.85", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.15", label: "High" },
      { value: "1.30", label: "Very High" },
      { value: "1.65", label: "Extra High" },
    ],
    time: [
      { value: "1.00", label: "Nominal" },
      { value: "1.11", label: "High" },
      { value: "1.30", label: "Very High" },
      { value: "1.66", label: "Extra High" },
    ],
    stor: [
      { value: "1.00", label: "Nominal" },
      { value: "1.06", label: "High" },
      { value: "1.21", label: "Very High" },
      { value: "1.56", label: "Extra High" },
    ],
    virt: [
      { value: "0.87", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.15", label: "High" },
      { value: "1.30", label: "Very High" },
    ],
    turn: [
      { value: "0.87", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.07", label: "High" },
      { value: "1.15", label: "Very High" },
    ],
    acap: [
      { value: "1.46", label: "Very Low" },
      { value: "1.19", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.86", label: "High" },
      { value: "0.71", label: "Very High" },
    ],
    aexp: [
      { value: "1.29", label: "Very Low" },
      { value: "1.13", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.91", label: "High" },
      { value: "0.82", label: "Very High" },
    ],
    pcap: [
      { value: "1.42", label: "Very Low" },
      { value: "1.17", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.86", label: "High" },
      { value: "0.70", label: "Very High" },
    ],
    vexp: [
      { value: "1.21", label: "Very Low" },
      { value: "1.10", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.90", label: "High" },
    ],
    lexp: [
      { value: "1.14", label: "Very Low" },
      { value: "1.07", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.95", label: "High" },
    ],
    modp: [
      { value: "1.24", label: "Very Low" },
      { value: "1.10", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.91", label: "High" },
      { value: "0.82", label: "Very High" },
    ],
    tool: [
      { value: "1.24", label: "Very Low" },
      { value: "1.10", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "0.91", label: "High" },
      { value: "0.83", label: "Very High" },
    ],
    sced: [
      { value: "1.23", label: "Very Low" },
      { value: "1.08", label: "Low" },
      { value: "1.00", label: "Nominal" },
      { value: "1.04", label: "High" },
      { value: "1.10", label: "Very High" },
    ],
  }

  const costFactorDescriptions = {
    rely: "Required software reliability",
    data: "Size of application database",
    cplx: "Complexity of the product",
    time: "Execution time constraint",
    stor: "Main storage constraint",
    virt: "Virtual machine volatility",
    turn: "Computer turnaround time",
    acap: "Analyst capability",
    aexp: "Applications experience",
    pcap: "Programmer capability",
    vexp: "Virtual machine experience",
    lexp: "Programming language experience",
    modp: "Use of modern programming practices",
    tool: "Use of software tools",
    sced: "Required development schedule",
  }

  const costFactorGroups = {
    "Product Attributes": ["rely", "data", "cplx"],
    "Hardware Attributes": ["time", "stor", "virt", "turn"],
    "Personnel Attributes": ["acap", "aexp", "pcap", "vexp", "lexp"],
    "Project Attributes": ["modp", "tool", "sced"],
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto max-h-[400px] pr-2">
      <Accordion type="multiple" defaultValue={["Product Attributes"]}>
        {Object.entries(costFactorGroups).map(([groupName, factors]) => (
          <AccordionItem key={groupName} value={groupName}>
            <AccordionTrigger>{groupName}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {factors.map((factor) => (
                  <div key={factor}>
                    <Label htmlFor={factor} className="text-sm">
                      {costFactorDescriptions[factor]}
                    </Label>
                    <Select value={costDrivers[factor].toString()} onValueChange={(value) => onChange(factor, value)}>
                      <SelectTrigger id={factor} className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {costDriverOptions[factor].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label} ({option.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
