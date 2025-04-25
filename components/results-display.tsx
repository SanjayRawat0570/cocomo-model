export function ResultsDisplay({ results, isCalculating = false }) {
  const { effort, developmentTime, teamSize, productivity } = results

  return (
    <div className="pt-4 border-t">
      <h3 className="font-medium mb-4">
        Results {isCalculating && <span className="text-sm text-muted-foreground">(calculating...)</span>}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Effort</p>
          <p className="text-xl font-semibold">{effort} PM</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Development Time</p>
          <p className="text-xl font-semibold">{developmentTime} months</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Team Size</p>
          <p className="text-xl font-semibold">{teamSize} people</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Productivity</p>
          <p className="text-xl font-semibold">{productivity} KLOC/PM</p>
        </div>
      </div>
    </div>
  )
}
