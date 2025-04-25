"use server"

import { calculateBasicCocomo, calculateWithCustomCoefficients } from "@/lib/cocomo-calculations"

export async function calculateResults({ size, projectType, useCustomCoefficients, coefficients }) {
  try {
    if (useCustomCoefficients) {
      return calculateWithCustomCoefficients(size, coefficients.a, coefficients.b, coefficients.c, coefficients.d)
    } else {
      return calculateBasicCocomo(size, projectType)
    }
  } catch (error) {
    console.error("Error in calculation:", error)
    return {
      effort: 0,
      developmentTime: 0,
      teamSize: 0,
      productivity: 0,
    }
  }
}
