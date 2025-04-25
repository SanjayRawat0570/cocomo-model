import { CocomoForm } from "@/components/cocomo-form"
import { calculateBasicCocomo } from "@/lib/cocomo-calculations"

export default function Home() {
  // Default values for initial render
  const defaultResults = calculateBasicCocomo(10, "organic")

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Basic COCOMO Calculator</h1>

      <div className="max-w-md mx-auto">
        <CocomoForm defaultResults={defaultResults} />
      </div>
    </div>
  )
}
