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
  withheldTax: number
}

export type TaxCalculationResult = {
  employmentIncomeDeduction: number
  grossIncome: number
  basicDeduction: number
  spouseDeduction: number
  dependentDeduction: number
  socialInsuranceDeduction: number
  lifeInsuranceDeduction: number
  earthquakeInsuranceDeduction: number
  smallBusinessMutual: number
  totalDeductions: number
  taxableIncome: number
  baseIncomeTax: number
  incomeTaxAfterHousing: number
  reconstructionTax: number
  incomeTax: number
  withheldTax: number
  yearEndAdjustment: number
}
