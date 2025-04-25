/**
 * Basic COCOMO Model Calculator
 *
 * This function calculates software project estimates using the Basic COCOMO model
 * developed by Barry Boehm.
 *
 * @param size - Project size in KLOC (thousands of lines of code)
 * @param projectType - Type of project: 'organic', 'semi-detached', or 'embedded'
 * @returns Object containing effort, development time, team size, and productivity
 */
export function calculateBasicCocomo(size: number, projectType: "organic" | "semi-detached" | "embedded") {
  // Coefficients for the Basic COCOMO model
  const coefficients = {
    organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
    "semi-detached": { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
    embedded: { a: 3.6, b: 1.2, c: 2.5, d: 0.32 },
  }

  // Get the appropriate coefficients based on project type
  const { a, b, c, d } = coefficients[projectType]

  return calculateWithCustomCoefficients(size, a, b, c, d)
}

/**
 * COCOMO Calculator with Custom Coefficients
 *
 * This function calculates software project estimates using custom coefficients
 * for the COCOMO model formulas.
 *
 * @param size - Project size in KLOC (thousands of lines of code)
 * @param a - Coefficient a for effort calculation
 * @param b - Coefficient b for effort calculation
 * @param c - Coefficient c for duration calculation
 * @param d - Coefficient d for duration calculation
 * @returns Object containing effort, development time, team size, and productivity
 */
export function calculateWithCustomCoefficients(size: number, a: number, b: number, c: number, d: number) {
  // Calculate effort in person-months: E = a * (KLOC)^b
  const effort = a * Math.pow(size, b)

  // Calculate development time in months: D = c * (E)^d
  const developmentTime = c * Math.pow(effort, d)

  // Calculate average team size: S = E / D
  const teamSize = effort / developmentTime

  // Calculate productivity: P = KLOC / E
  const productivity = size / effort

  return {
    effort: Number.parseFloat(effort.toFixed(2)),
    developmentTime: Number.parseFloat(developmentTime.toFixed(2)),
    teamSize: Number.parseFloat(teamSize.toFixed(2)),
    productivity: Number.parseFloat(productivity.toFixed(2)),
  }
}

/**
 * Intermediate COCOMO Model Calculator
 *
 * This function calculates software project estimates using the Intermediate COCOMO model.
 *
 * @param size - Project size in KLOC (thousands of lines of code)
 * @param projectType - Type of project: 'organic', 'semi-detached', or 'embedded'
 * @param costDrivers - Object containing cost driver ratings
 * @returns Object containing effort, development time, team size, and productivity
 */
export function calculateIntermediateCocomo(
  size: number,
  projectType: "organic" | "semi-detached" | "embedded",
  costDrivers: any,
  laborRate: number,
) {
  // Basic COCOMO calculation
  let { effort, developmentTime, teamSize, productivity } = calculateBasicCocomo(size, projectType)

  // Apply effort adjustment factor (EAF) based on cost drivers
  let eaf = 1.0
  for (const key in costDrivers) {
    eaf *= costDrivers[key]
  }

  effort *= eaf
  developmentTime = 2.5 * Math.pow(effort, 0.35)
  teamSize = effort / developmentTime

  const cost = (effort * laborRate) / 12

  return {
    effort: Number.parseFloat(effort.toFixed(2)),
    developmentTime: Number.parseFloat(developmentTime.toFixed(2)),
    teamSize: Number.parseFloat(teamSize.toFixed(2)),
    productivity: Number.parseFloat(productivity.toFixed(2)),
    cost: Number.parseFloat(cost.toFixed(2)),
  }
}

/**
 * Detailed COCOMO Model Calculator
 *
 * This function calculates software project estimates using the Detailed COCOMO model.
 *
 * @param size - Project size in KLOC (thousands of lines of code)
 * @param scaleFactors - Object containing scale factor ratings
 * @param costDrivers - Object containing cost driver ratings
 * @returns Object containing effort, development time, team size, and productivity
 */
export function calculateDetailedCocomo(size: number, scaleFactors: any, costDrivers: any, laborRate: number) {
  // Calculate effort adjustment factor (EAF) based on cost drivers
  let eaf = 1.0
  for (const key in costDrivers) {
    eaf *= costDrivers[key]
  }

  // Calculate effort multiplier (EM) based on scale factors
  let sf = 0
  for (const key in scaleFactors) {
    sf += scaleFactors[key]
  }

  // Effort calculation
  const effort = 2.94 * Math.pow(size, 0.91 + 0.01 * sf) * eaf

  // Development time calculation
  const developmentTime = 3.67 * Math.pow(effort, 0.28)
  const teamSize = effort / developmentTime

  const cost = (effort * laborRate) / 12

  return {
    effort: Number.parseFloat(effort.toFixed(2)),
    developmentTime: Number.parseFloat(developmentTime.toFixed(2)),
    teamSize: Number.parseFloat(teamSize.toFixed(2)),
    productivity: Number.parseFloat((size / effort).toFixed(2)),
    cost: Number.parseFloat(cost.toFixed(2)),
  }
}
