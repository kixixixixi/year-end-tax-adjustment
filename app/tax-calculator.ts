import { TaxCalculationData, TaxCalculationResult } from "./types"

export type TaxCalculationInput = TaxCalculationData

function calculateEmploymentIncomeDeduction(annualIncome: number): number {
  if (annualIncome <= 1900000) {
    return 650000
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

function calculateBasicDeduction(grossIncome: number): number {
  if (grossIncome <= 2400000) {
    return 480000
  } else if (grossIncome <= 2450000) {
    return 320000
  } else if (grossIncome <= 2500000) {
    return 160000
  } else {
    return 0
  }
}

function calculateSpouseDeduction(spouseIncome: number): number {
  if (spouseIncome === 0) {
    return 0
  }
  
  const spouseEmploymentDeduction = calculateEmploymentIncomeDeduction(spouseIncome)
  const spouseGrossIncome = spouseIncome - spouseEmploymentDeduction
  
  if (spouseGrossIncome <= 480000) {
    return 380000
  } else if (spouseGrossIncome <= 950000) {
    return 380000
  } else if (spouseGrossIncome <= 1000000) {
    return 360000
  } else if (spouseGrossIncome <= 1050000) {
    return 310000
  } else if (spouseGrossIncome <= 1100000) {
    return 260000
  } else if (spouseGrossIncome <= 1150000) {
    return 210000
  } else if (spouseGrossIncome <= 1200000) {
    return 160000
  } else if (spouseGrossIncome <= 1250000) {
    return 110000
  } else if (spouseGrossIncome <= 1300000) {
    return 60000
  } else if (spouseGrossIncome <= 1330000) {
    return 30000
  }
  
  return 0
}

function calculateDependentDeduction(
  dependents: number,
  dependentsOver70: number
): number {
  return dependents * 380000 + dependentsOver70 * 480000
}

function calculateSocialInsuranceDeduction(socialInsuranceAmount: number): number {
  return socialInsuranceAmount
}

function calculateLifeInsuranceDeduction(amount: number): number {
  if (amount <= 20000) {
    return amount
  } else if (amount <= 40000) {
    return Math.floor(amount / 2) + 10000
  } else if (amount <= 80000) {
    return Math.floor(amount / 4) + 20000
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

  const basicDeduction = calculateBasicDeduction(grossIncome)
  const spouseDeduction = calculateSpouseDeduction(input.spouseIncome)
  const dependentDeduction = calculateDependentDeduction(
    input.dependents,
    input.dependentsOver70
  )
  const socialInsuranceDeduction =
    calculateSocialInsuranceDeduction(input.socialInsurance)
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

  const estimatedWithheldTax = Math.floor(input.annualIncome * 0.1021)
  const yearEndAdjustment = estimatedWithheldTax - incomeTax

  return {
    grossIncome,
    totalDeductions,
    taxableIncome,
    incomeTax,
    yearEndAdjustment,
  }
}
