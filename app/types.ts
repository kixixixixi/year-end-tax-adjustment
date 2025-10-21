export type TaxCalculationData = {
  annualIncome: number
  spouseIncome: number
  dependents: number
  dependentsOver70: number
  socialInsurance: number
  lifeInsurance: number
  earthquakeInsurance: number
  smallBusinessMutual: number
  housingLoanCredit: number
}

export type TaxCalculationResult = {
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  incomeTax: number
  yearEndAdjustment: number
}
