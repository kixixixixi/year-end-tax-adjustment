import { TaxCalculationData, TaxCalculationResult } from "./types"

export type TaxCalculationInput = TaxCalculationData

function calculateEmploymentIncomeDeduction(annualIncome: number): number {
  if (annualIncome <= 1625000) {
    return 550000
  } else if (annualIncome <= 1800000) {
    return annualIncome * 0.4 - 100000
  } else if (annualIncome <= 3600000) {
    return annualIncome * 0.3 + 80000
  } else if (annualIncome <= 6600000) {
    return annualIncome * 0.2 + 440000
  } else if (annualIncome <= 8500000) {
    return annualIncome * 0.1 + 1100000
  } else {
    return 1950000
  }
}

function calculateBasicDeduction(): number {
  return 480000
}

function calculateSpouseDeduction(spouseIncome: number): number {
  if (spouseIncome <= 1030000) {
    return 380000
  } else if (spouseIncome <= 1130000) {
    const ratio = (1130000 - spouseIncome) / 100000
    return Math.floor(380000 * ratio)
  }
  return 0
}

function calculateDependentDeduction(
  dependents: number,
  dependentsOver70: number
): number {
  return dependents * 380000 + dependentsOver70 * 580000
}

function calculateSocialInsuranceDeduction(grossIncome: number): number {
  return Math.floor(grossIncome * 0.15)
}

function calculateLifeInsuranceDeduction(amount: number): number {
  if (amount <= 20000) {
    return amount
  } else if (amount <= 40000) {
    return Math.floor(amount / 2) + 10000
  } else {
    return 40000
  }
}

function calculateEarthquakeInsuranceDeduction(amount: number): number {
  return Math.min(amount, 50000)
}

function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 1950000) {
    return Math.floor(taxableIncome * 0.05)
  } else if (taxableIncome <= 3300000) {
    return Math.floor(taxableIncome * 0.1 - 97500)
  } else if (taxableIncome <= 6950000) {
    return Math.floor(taxableIncome * 0.2 - 427500)
  } else if (taxableIncome <= 9000000) {
    return Math.floor(taxableIncome * 0.23 - 636000)
  } else if (taxableIncome <= 18000000) {
    return Math.floor(taxableIncome * 0.33 - 1536000)
  } else if (taxableIncome <= 40000000) {
    return Math.floor(taxableIncome * 0.4 - 2796000)
  } else {
    return Math.floor(taxableIncome * 0.45 - 4796000)
  }
}

export function calculateYearEndAdjustment(
  input: TaxCalculationInput
): TaxCalculationResult {
  const employmentIncomeDeduction = calculateEmploymentIncomeDeduction(
    input.annualIncome
  )
  const grossIncome = input.annualIncome - employmentIncomeDeduction

  const basicDeduction = calculateBasicDeduction()
  const spouseDeduction = calculateSpouseDeduction(input.spouseIncome)
  const dependentDeduction = calculateDependentDeduction(
    input.dependents,
    input.dependentsOver70
  )
  const socialInsuranceDeduction =
    calculateSocialInsuranceDeduction(grossIncome)
  const lifeInsuranceDeduction = calculateLifeInsuranceDeduction(
    input.lifeInsurance
  )
  const earthquakeInsuranceDeduction = calculateEarthquakeInsuranceDeduction(
    input.earthquakeInsurance
  )

  const totalDeductions =
    basicDeduction +
    spouseDeduction +
    dependentDeduction +
    socialInsuranceDeduction +
    lifeInsuranceDeduction +
    earthquakeInsuranceDeduction +
    input.smallBusinessMutual

  const taxableIncome = Math.max(0, grossIncome - totalDeductions)

  let incomeTax = calculateIncomeTax(taxableIncome)

  incomeTax = Math.max(0, incomeTax - input.housingLoanCredit)

  const estimatedWithheldTax = Math.floor(input.annualIncome * 0.05)
  const yearEndAdjustment = estimatedWithheldTax - incomeTax

  return {
    grossIncome,
    totalDeductions,
    taxableIncome,
    incomeTax,
    yearEndAdjustment,
  }
}
