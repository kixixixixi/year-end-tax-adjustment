export interface SocialInsuranceInput {
  monthlyIncome: number
  bonusIncome: number
  prefecture: string
  age: number
  hasEmploymentInsurance: boolean
}

export interface SocialInsuranceResult {
  healthInsurance: number
  longTermCareInsurance: number
  employeePension: number
  employmentInsurance: number
  total: number
}

// 健康保険料率（協会けんぽ 2024年度）
const HEALTH_INSURANCE_RATES: { [key: string]: number } = {
  'tokyo': 0.1000,
  'osaka': 0.1018,
  'kanagawa': 0.1019,
  'aichi': 0.1000,
  'default': 0.1000, // 全国平均
}

// 介護保険料率（40歳以上）
const LONG_TERM_CARE_RATE = 0.0123

// 厚生年金保険料率
const EMPLOYEE_PENSION_RATE = 0.183

// 雇用保険料率（一般事業）
const EMPLOYMENT_INSURANCE_RATE = 0.006

// 標準報酬月額等級表（簡略版）
const STANDARD_MONTHLY_SALARY_GRADES = [
  { min: 58000, max: 63000, standard: 58000 },
  { min: 63000, max: 73000, standard: 68000 },
  { min: 73000, max: 83000, standard: 78000 },
  { min: 83000, max: 93000, standard: 88000 },
  { min: 93000, max: 101000, standard: 98000 },
  { min: 101000, max: 107000, standard: 104000 },
  { min: 107000, max: 114000, standard: 110000 },
  { min: 114000, max: 122000, standard: 118000 },
  { min: 122000, max: 130000, standard: 126000 },
  { min: 130000, max: 138000, standard: 134000 },
  { min: 138000, max: 146000, standard: 142000 },
  { min: 146000, max: 155000, standard: 150000 },
  { min: 155000, max: 165000, standard: 160000 },
  { min: 165000, max: 175000, standard: 170000 },
  { min: 175000, max: 185000, standard: 180000 },
  { min: 185000, max: 195000, standard: 190000 },
  { min: 195000, max: 210000, standard: 200000 },
  { min: 210000, max: 230000, standard: 220000 },
  { min: 230000, max: 250000, standard: 240000 },
  { min: 250000, max: 270000, standard: 260000 },
  { min: 270000, max: 290000, standard: 280000 },
  { min: 290000, max: 310000, standard: 300000 },
  { min: 310000, max: 330000, standard: 320000 },
  { min: 330000, max: 350000, standard: 340000 },
  { min: 350000, max: 370000, standard: 360000 },
  { min: 370000, max: 395000, standard: 380000 },
  { min: 395000, max: 425000, standard: 410000 },
  { min: 425000, max: 455000, standard: 440000 },
  { min: 455000, max: 485000, standard: 470000 },
  { min: 485000, max: 515000, standard: 500000 },
  { min: 515000, max: 545000, standard: 530000 },
  { min: 545000, max: 575000, standard: 560000 },
  { min: 575000, max: 605000, standard: 590000 },
  { min: 605000, max: 635000, standard: 620000 },
  { min: 635000, max: Infinity, standard: 650000 },
]

function getStandardMonthlySalary(monthlyIncome: number): number {
  for (const grade of STANDARD_MONTHLY_SALARY_GRADES) {
    if (monthlyIncome >= grade.min && monthlyIncome < grade.max) {
      return grade.standard
    }
  }
  return STANDARD_MONTHLY_SALARY_GRADES[STANDARD_MONTHLY_SALARY_GRADES.length - 1].standard
}

function getHealthInsuranceRate(prefecture: string): number {
  return HEALTH_INSURANCE_RATES[prefecture] || HEALTH_INSURANCE_RATES['default']
}

export function calculateSocialInsurance(input: SocialInsuranceInput): SocialInsuranceResult {
  const standardMonthlySalary = getStandardMonthlySalary(input.monthlyIncome)
  const healthInsuranceRate = getHealthInsuranceRate(input.prefecture)
  
  // 健康保険料（月額）
  const monthlyHealthInsurance = Math.floor(standardMonthlySalary * healthInsuranceRate / 2)
  
  // 介護保険料（40歳以上のみ）
  const monthlyLongTermCareInsurance = input.age >= 40 
    ? Math.floor(standardMonthlySalary * LONG_TERM_CARE_RATE / 2)
    : 0
  
  // 厚生年金保険料（月額）
  const monthlyEmployeePension = Math.floor(standardMonthlySalary * EMPLOYEE_PENSION_RATE / 2)
  
  // 雇用保険料（年額、賞与も含む）
  const annualEmploymentInsurance = input.hasEmploymentInsurance
    ? Math.floor((input.monthlyIncome * 12 + input.bonusIncome) * EMPLOYMENT_INSURANCE_RATE)
    : 0
  
  // 年額計算
  const healthInsurance = monthlyHealthInsurance * 12
  const longTermCareInsurance = monthlyLongTermCareInsurance * 12
  const employeePension = monthlyEmployeePension * 12
  const employmentInsurance = annualEmploymentInsurance
  
  const total = healthInsurance + longTermCareInsurance + employeePension + employmentInsurance
  
  return {
    healthInsurance,
    longTermCareInsurance,
    employeePension,
    employmentInsurance,
    total,
  }
}

export function estimateMonthlySalaryFromAnnual(annualIncome: number, bonusMonths: number = 2): number {
  // 年収から月額給与を推定（賞与分を除く）
  const bonusRatio = bonusMonths / 12
  const monthlyRatio = 1 - bonusRatio
  return Math.floor(annualIncome * monthlyRatio / 12)
}

export function estimateBonusFromAnnual(annualIncome: number, bonusMonths: number = 2): number {
  // 年収から賞与額を推定
  const bonusRatio = bonusMonths / 12
  return Math.floor(annualIncome * bonusRatio)
}