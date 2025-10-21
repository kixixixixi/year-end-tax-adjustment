import { useState, useCallback } from "react"
import { TaxCalculationData, TaxCalculationResult } from "../types"
import { calculateYearEndAdjustment } from "../tax-calculator"

const initialFormData: TaxCalculationData = {
  annualIncome: 0,
  spouseIncome: 0,
  dependents: 0,
  dependentsOver70: 0,
  lifeInsurance: 0,
  earthquakeInsurance: 0,
  smallBusinessMutual: 0,
  housingLoanCredit: 0,
}

export const useTaxCalculation = () => {
  const [formData, setFormData] = useState<TaxCalculationData>(initialFormData)
  const [result, setResult] = useState<TaxCalculationResult | null>(null)

  const updateField = useCallback(
    (field: keyof TaxCalculationData, value: number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  )

  const calculate = useCallback(() => {
    const calculationResult = calculateYearEndAdjustment(formData)
    setResult(calculationResult)
  }, [formData])

  const reset = useCallback(() => {
    setFormData(initialFormData)
    setResult(null)
  }, [])

  return {
    formData,
    result,
    updateField,
    calculate,
    reset,
  }
}
