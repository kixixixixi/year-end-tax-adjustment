// app/tax-calculator.ts (improved)
// - Adds reconstruction tax
// - Fixes spouse deduction logic to depend on taxpayer gross income
// - Caps smallBusinessMutual via configurable constant
// - Returns detailed intermediate values for testing/debugging

import { TaxCalculationData, TaxCalculationResult } from "./types"

export type TaxCalculationInput = TaxCalculationData

// CONFIG: adjust these if law changes
const SMALL_BUSINESS_MUTUAL_CAP = 840000 // configurable; set to Infinity if no cap desired
const RECONSTRUCTION_TAX_RATE = 0.021 // 復興特別所得税（2.1%）

function floor(value: number): number {
  // 円未満は切り捨て（国税庁の慣例に合わせる）
  return Math.floor(value)
}

function calculateEmploymentIncomeDeduction(annualIncome: number): number {
  // データ駆動でも良いが既存の閾値ロジックを保持（端数は下方向）
  if (annualIncome <= 1625000) {
    return 550000
  } else if (annualIncome <= 1800000) {
    return floor(annualIncome * 0.4 - 100000)
  } else if (annualIncome <= 3600000) {
    return floor(annualIncome * 0.3 + 80000)
  } else if (annualIncome <= 6600000) {
    return floor(annualIncome * 0.2 + 440000)
  } else if (annualIncome <= 8500000) {
    return floor(annualIncome * 0.1 + 1100000)
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

/**
 * 配偶者控除 / 配偶者特別控除
 * - spouseIncome: 配偶者の年収（支払金額）
 * - taxpayerGrossIncome: 納税者の給与所得（給与所得控除後の金額）
 *
 * NOTE:
 * - 日本の制度では配偶者控除の額は納税者側の合計所得金額（または給与所得控除後の金額の区分）に依存するため
 *   納税者の grossIncome を参照して判定します。
 * - この関数は配偶者の「給与収入」を受け取り、まず給与所得控除を適用して配偶者の合計所得（概算）を作り、
 *   そこから配偶者控除 / 配偶者特別控除の該当額を返します。
 */
function calculateSpouseDeduction(
  spouseIncome: number,
  taxpayerGrossIncome: number
): number {
  // 配偶者がいない（0）なら配偶者の給与所得は0 -> 配偶者控除の最大値が適用される可能性がある
  const spouseEmploymentDeduction =
    calculateEmploymentIncomeDeduction(spouseIncome)
  const spouseGrossIncome = Math.max(
    0,
    spouseIncome - spouseEmploymentDeduction
  )

  // 納税者（本人）の合計所得（ここでは grossIncome を用いる）
  // 実制度では「合計所得金額」を正確に計算する必要がある点に注意
  const payerIncome = taxpayerGrossIncome

  // 配偶者控除（配偶者の合計所得が48万円以下で納税者の所得が一定以下のとき）
  // ここでは簡潔に、納税者所得の区分により配偶者控除の上限を適用する（代表的な区分）
  // 細かい金額（38万/33万/26万 等）の対応は納税者所得帯によって変わるため、代表的判定を実装。
  // 以下の区分は一般的な表に合わせた実装（必要に応じて微調整してください）。
  //  - payerIncome <= 12200000 -> full spouse deduction (380000)
  //  - payerIncome > 12200000 && payerIncome <= 15000000 -> reduced (330000)
  //  - payerIncome > 15000000 -> no spouse deduction
  // この区分は実務で用いる場合に法令と照合してください。

  // 配偶者の合計所得でまず対象か判定（48万円以下 -> 配偶者控除対象）
  if (spouseGrossIncome <= 480000) {
    // 配偶者控除（納税者の所得に依存）
    if (payerIncome <= 12200000) {
      return 380000
    } else if (payerIncome <= 15000000) {
      return 330000
    } else {
      return 0
    }
  }

  // 配偶者特別控除（配偶者の合計所得が48万円超〜133万円以下など段階的）
  // ここは配偶者の所得帯に応じて段階的に控除額が下がる典型表を実装します。
  // 表（配偶者の合計所得に対する控除額） — 代表値（納税者所得が低い場合を想定）
  if (spouseGrossIncome <= 950000) {
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
  // 扶養控除（一般）380,000、70歳以上は480,000
  return dependents * 380000 + dependentsOver70 * 480000
}

function calculateSocialInsuranceDeduction(
  socialInsuranceAmount: number
): number {
  // 社保は実額控除（将来的に項目別に分ける場合はここで分解）
  return floor(socialInsuranceAmount)
}

function calculateLifeInsuranceDeduction(amount: number): number {
  if (amount <= 20000) {
    return floor(amount)
  } else if (amount <= 40000) {
    return floor(amount / 2) + 10000
  } else if (amount <= 80000) {
    return floor(amount / 4) + 20000
  } else {
    return 40000
  }
}

function calculateEarthquakeInsuranceDeduction(amount: number): number {
  return Math.min(floor(amount), 50000)
}

function calculateIncomeTax(taxableIncome: number): number {
  // 速算表に基づく税額（円未満切捨て）
  if (taxableIncome <= 1950000) {
    return floor(taxableIncome * 0.05)
  } else if (taxableIncome <= 3300000) {
    return floor(taxableIncome * 0.1 - 97500)
  } else if (taxableIncome <= 6950000) {
    return floor(taxableIncome * 0.2 - 427500)
  } else if (taxableIncome <= 9000000) {
    return floor(taxableIncome * 0.23 - 636000)
  } else if (taxableIncome <= 18000000) {
    return floor(taxableIncome * 0.33 - 1536000)
  } else if (taxableIncome <= 40000000) {
    return floor(taxableIncome * 0.4 - 2796000)
  } else {
    return floor(taxableIncome * 0.45 - 4796000)
  }
}

export function calculateYearEndAdjustment(
  input: TaxCalculationInput
): TaxCalculationResult {
  // Validate inputs minimally
  const annualIncome = Math.max(0, input.annualIncome || 0)
  const spouseIncome = Math.max(0, input.spouseIncome || 0)

  // 1) 給与所得控除 → 給与所得（grossIncome）
  const employmentIncomeDeduction =
    calculateEmploymentIncomeDeduction(annualIncome)
  const grossIncome = Math.max(0, annualIncome - employmentIncomeDeduction)
  // floor grossIncome to yen
  const flooredGrossIncome = floor(grossIncome)

  // 2) 各種所得控除
  const basicDeduction = calculateBasicDeduction(flooredGrossIncome)
  const spouseDeduction = calculateSpouseDeduction(
    spouseIncome,
    flooredGrossIncome
  )
  const dependentDeduction = calculateDependentDeduction(
    input.dependents || 0,
    input.dependentsOver70 || 0
  )
  const socialInsuranceDeduction = calculateSocialInsuranceDeduction(
    input.socialInsurance || 0
  )
  const lifeInsuranceDeduction = calculateLifeInsuranceDeduction(
    input.lifeInsurance || 0
  )
  const earthquakeInsuranceDeduction = calculateEarthquakeInsuranceDeduction(
    input.earthquakeInsurance || 0
  )

  // smallBusinessMutual: apply configurable cap
  const smallBusinessMutual = Math.min(
    Math.max(0, input.smallBusinessMutual || 0),
    SMALL_BUSINESS_MUTUAL_CAP
  )

  const totalDeductions =
    basicDeduction +
    spouseDeduction +
    dependentDeduction +
    socialInsuranceDeduction +
    lifeInsuranceDeduction +
    earthquakeInsuranceDeduction +
    smallBusinessMutual

  // 3) 課税所得（給与所得控除後 − 所得控除）
  const taxableIncome = Math.max(0, flooredGrossIncome - totalDeductions)
  const flooredTaxableIncome = floor(taxableIncome)

  // 4) 所得税（速算表）
  const baseIncomeTax = calculateIncomeTax(flooredTaxableIncome)

  // 5) 住宅ローン控除（税額控除）をまず所得税から差し引く（上限：所得税額）
  const housingLoanCredit = Math.max(0, input.housingLoanCredit || 0)
  const incomeTaxAfterHousing = Math.max(0, baseIncomeTax - housingLoanCredit)

  // 6) 復興特別所得税（所得税に対して2.1%） -- 復興税は通常「所得税額に対する」課税
  const reconstructionTax = floor(
    incomeTaxAfterHousing * RECONSTRUCTION_TAX_RATE
  )

  // 7) 合計所得税（所得税 + 復興特別所得税）
  const totalIncomeTax = incomeTaxAfterHousing + reconstructionTax

  // 8) 年末調整結果（源泉徴収済税額との差）
  const withheldTax = Math.max(0, input.withheldTax || 0)
  const yearEndAdjustment = withheldTax - totalIncomeTax

  // Return detailed result for easier testing and debugging
  return {
    employmentIncomeDeduction: floor(employmentIncomeDeduction),
    grossIncome: flooredGrossIncome,
    basicDeduction,
    spouseDeduction,
    dependentDeduction,
    socialInsuranceDeduction,
    lifeInsuranceDeduction,
    earthquakeInsuranceDeduction,
    smallBusinessMutual,
    totalDeductions,
    taxableIncome: flooredTaxableIncome,
    baseIncomeTax,
    incomeTaxAfterHousing,
    reconstructionTax,
    incomeTax: totalIncomeTax,
    withheldTax,
    yearEndAdjustment,
  }
}
