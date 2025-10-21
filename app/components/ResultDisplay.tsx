import React from "react"
import { TaxCalculationResult } from "../types"

interface ResultDisplayProps {
  result: TaxCalculationResult | null
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginBottom: "1.5rem",
      marginTop: "1.5rem",
      padding: "1.5rem",
    }}>
      <h2 style={{
        color: "#1f2937",
        marginBottom: "1rem",
        marginTop: 0,
      }}>計算結果</h2>
      <div style={{
        display: "grid",
        gap: "0.5rem",
      }}>
        <div>給与所得: {result.grossIncome.toLocaleString()}円</div>
        <div>所得控除合計: {result.totalDeductions.toLocaleString()}円</div>
        <div>課税所得: {result.taxableIncome.toLocaleString()}円</div>
        <div>所得税額: {result.incomeTax.toLocaleString()}円</div>
        <div style={{
          color: "#dc2626",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}>
          年末調整額: {result.yearEndAdjustment.toLocaleString()}円
        </div>
      </div>
    </div>
  )
}
