"use client"

import React, { useState } from "react"
import { InputField } from "./InputField"
import { 
  calculateSocialInsurance, 
  estimateMonthlySalaryFromAnnual, 
  estimateBonusFromAnnual,
  SocialInsuranceInput,
  SocialInsuranceResult 
} from "../social-insurance-calculator"

interface SocialInsuranceEstimatorProps {
  annualIncome: number
  onEstimatedAmountChange: (amount: number) => void
}

export const SocialInsuranceEstimator: React.FC<SocialInsuranceEstimatorProps> = ({
  annualIncome,
  onEstimatedAmountChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [estimatorData, setEstimatorData] = useState<SocialInsuranceInput>({
    monthlyIncome: estimateMonthlySalaryFromAnnual(annualIncome),
    bonusIncome: estimateBonusFromAnnual(annualIncome),
    prefecture: "tokyo",
    age: 30,
    hasEmploymentInsurance: true,
  })
  const [result, setResult] = useState<SocialInsuranceResult | null>(null)

  const prefectures = [
    { value: "tokyo", label: "東京都" },
    { value: "osaka", label: "大阪府" },
    { value: "kanagawa", label: "神奈川県" },
    { value: "aichi", label: "愛知県" },
    { value: "default", label: "その他（全国平均）" },
  ]

  const updateField = (field: keyof SocialInsuranceInput, value: any) => {
    setEstimatorData(prev => ({ ...prev, [field]: value }))
  }

  const calculate = () => {
    const calculatedResult = calculateSocialInsurance(estimatorData)
    setResult(calculatedResult)
    onEstimatedAmountChange(calculatedResult.total)
  }

  const autoEstimate = () => {
    const monthlyIncome = estimateMonthlySalaryFromAnnual(annualIncome)
    const bonusIncome = estimateBonusFromAnnual(annualIncome)
    
    setEstimatorData(prev => ({
      ...prev,
      monthlyIncome,
      bonusIncome,
    }))
    
    const autoResult = calculateSocialInsurance({
      ...estimatorData,
      monthlyIncome,
      bonusIncome,
    })
    
    setResult(autoResult)
    onEstimatedAmountChange(autoResult.total)
  }

  return (
    <div style={{
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "0.5rem",
      marginBottom: "1rem",
      padding: "1rem",
    }}>
      <div style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: isOpen ? "1rem" : "0",
      }}>
        <h3 style={{
          color: "#374151",
          fontSize: "1rem",
          fontWeight: "600",
          margin: 0,
        }}>
          社会保険料推計ツール
        </h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{
              backgroundColor: "#10b981",
              border: "none",
              borderRadius: "0.25rem",
              color: "white",
              cursor: "pointer",
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
            }}
            onClick={autoEstimate}
          >
            自動推計
          </button>
          <button
            style={{
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "0.25rem",
              color: "white",
              cursor: "pointer",
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "閉じる" : "詳細設定"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div>
          <div style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            marginBottom: "1rem",
          }}>
            <InputField
              id="monthlyIncome"
              label="月額給与（円）"
              value={estimatorData.monthlyIncome}
              onChange={(value) => updateField("monthlyIncome", value)}
              placeholder="例: 300,000"
            />
            <InputField
              id="bonusIncome"
              label="年間賞与（円）"
              value={estimatorData.bonusIncome}
              onChange={(value) => updateField("bonusIncome", value)}
              placeholder="例: 1,000,000"
            />
          </div>

          <div style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            marginBottom: "1rem",
          }}>
            <div>
              <label style={{
                color: "#374151",
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}>
                都道府県
              </label>
              <select
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                  padding: "0.75rem",
                  width: "100%",
                }}
                value={estimatorData.prefecture}
                onChange={(e) => updateField("prefecture", e.target.value)}
              >
                {prefectures.map((pref) => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              id="age"
              label="年齢"
              value={estimatorData.age}
              onChange={(value) => updateField("age", value)}
              placeholder="30"
            />

            <div>
              <label style={{
                color: "#374151",
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}>
                雇用保険
              </label>
              <label style={{
                alignItems: "center",
                display: "flex",
                gap: "0.5rem",
              }}>
                <input
                  type="checkbox"
                  checked={estimatorData.hasEmploymentInsurance}
                  onChange={(e) => updateField("hasEmploymentInsurance", e.target.checked)}
                />
                加入している
              </label>
            </div>
          </div>

          <button
            style={{
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "0.375rem",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "0.75rem 2rem",
              width: "100%",
            }}
            onClick={calculate}
          >
            社会保険料を計算
          </button>
        </div>
      )}

      {result && (
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.375rem",
          marginTop: "1rem",
          padding: "1rem",
        }}>
          <h4 style={{
            color: "#1f2937",
            fontSize: "0.875rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
            marginTop: 0,
          }}>
            推計結果（年額）
          </h4>
          <div style={{
            display: "grid",
            fontSize: "0.875rem",
            gap: "0.25rem",
          }}>
            <div>健康保険料: {result.healthInsurance.toLocaleString()}円</div>
            {result.longTermCareInsurance > 0 && (
              <div>介護保険料: {result.longTermCareInsurance.toLocaleString()}円</div>
            )}
            <div>厚生年金保険料: {result.employeePension.toLocaleString()}円</div>
            {result.employmentInsurance > 0 && (
              <div>雇用保険料: {result.employmentInsurance.toLocaleString()}円</div>
            )}
            <div style={{
              borderTop: "1px solid #e5e7eb",
              fontWeight: "600",
              marginTop: "0.5rem",
              paddingTop: "0.5rem",
            }}>
              合計: {result.total.toLocaleString()}円
            </div>
          </div>
        </div>
      )}
    </div>
  )
}