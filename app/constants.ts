export const FORM_FIELDS = {
  BASIC_INFO: {
    annualIncome: {
      label: "年収（円）",
      placeholder: "例: 5,000,000",
    },
    spouseIncome: {
      label: "配偶者の年収（円）",
      placeholder: "例: 1,000,000",
    },
    dependents: {
      label: "扶養親族数（70歳未満）",
      placeholder: "0",
    },
    dependentsOver70: {
      label: "扶養親族数（70歳以上）",
      placeholder: "0",
    },
  },
  DEDUCTIONS: {
    socialInsurance: {
      label: "社会保険料控除（円）",
      placeholder: "例: 720,000",
    },
    lifeInsurance: {
      label: "生命保険料控除（円）",
      placeholder: "例: 40,000",
    },
    earthquakeInsurance: {
      label: "地震保険料控除（円）",
      placeholder: "例: 50,000",
    },
    smallBusinessMutual: {
      label: "小規模企業共済等掛金控除（円）",
      placeholder: "例: 240,000",
    },
    housingLoanCredit: {
      label: "住宅借入金等特別控除（円）",
      placeholder: "例: 200,000",
    },
  },
} as const

export const SECTION_TITLES = {
  BASIC_INFO: "基本情報",
  DEDUCTIONS: "各種控除",
  RESULTS: "計算結果",
} as const
