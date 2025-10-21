"use client"

import React, { FC } from "react"
import { InputField } from "./components/InputField"
import { Section } from "./components/Section"
import { ResultDisplay } from "./components/ResultDisplay"
import { useTaxCalculation } from "./hooks/useTaxCalculation"
import { FORM_FIELDS, SECTION_TITLES } from "./constants"

const Page: FC = () => {
  const { formData, result, updateField, calculate } = useTaxCalculation()

  return (
    <div>
      <Section title={SECTION_TITLES.BASIC_INFO}>
        <InputField
          id="annualIncome"
          label={FORM_FIELDS.BASIC_INFO.annualIncome.label}
          value={formData.annualIncome}
          onChange={(value) => updateField("annualIncome", value)}
          placeholder={FORM_FIELDS.BASIC_INFO.annualIncome.placeholder}
        />

        <InputField
          id="spouseIncome"
          label={FORM_FIELDS.BASIC_INFO.spouseIncome.label}
          value={formData.spouseIncome}
          onChange={(value) => updateField("spouseIncome", value)}
          placeholder={FORM_FIELDS.BASIC_INFO.spouseIncome.placeholder}
        />

        <div style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}>
          <InputField
            id="dependents"
            label={FORM_FIELDS.BASIC_INFO.dependents.label}
            value={formData.dependents}
            onChange={(value) => updateField("dependents", value)}
            placeholder={FORM_FIELDS.BASIC_INFO.dependents.placeholder}
          />
          <InputField
            id="dependentsOver70"
            label={FORM_FIELDS.BASIC_INFO.dependentsOver70.label}
            value={formData.dependentsOver70}
            onChange={(value) => updateField("dependentsOver70", value)}
            placeholder={FORM_FIELDS.BASIC_INFO.dependentsOver70.placeholder}
          />
        </div>
      </Section>

      <Section title={SECTION_TITLES.DEDUCTIONS}>
        <InputField
          id="socialInsurance"
          label={FORM_FIELDS.DEDUCTIONS.socialInsurance.label}
          value={formData.socialInsurance}
          onChange={(value) => updateField("socialInsurance", value)}
          placeholder={FORM_FIELDS.DEDUCTIONS.socialInsurance.placeholder}
        />

        <InputField
          id="lifeInsurance"
          label={FORM_FIELDS.DEDUCTIONS.lifeInsurance.label}
          value={formData.lifeInsurance}
          onChange={(value) => updateField("lifeInsurance", value)}
          placeholder={FORM_FIELDS.DEDUCTIONS.lifeInsurance.placeholder}
        />

        <InputField
          id="earthquakeInsurance"
          label={FORM_FIELDS.DEDUCTIONS.earthquakeInsurance.label}
          value={formData.earthquakeInsurance}
          onChange={(value) => updateField("earthquakeInsurance", value)}
          placeholder={FORM_FIELDS.DEDUCTIONS.earthquakeInsurance.placeholder}
        />

        <InputField
          id="smallBusinessMutual"
          label={FORM_FIELDS.DEDUCTIONS.smallBusinessMutual.label}
          value={formData.smallBusinessMutual}
          onChange={(value) => updateField("smallBusinessMutual", value)}
          placeholder={FORM_FIELDS.DEDUCTIONS.smallBusinessMutual.placeholder}
        />

        <InputField
          id="housingLoanCredit"
          label={FORM_FIELDS.DEDUCTIONS.housingLoanCredit.label}
          value={formData.housingLoanCredit}
          onChange={(value) => updateField("housingLoanCredit", value)}
          placeholder={FORM_FIELDS.DEDUCTIONS.housingLoanCredit.placeholder}
        />
      </Section>

      <button style={{
        backgroundColor: "#2563eb",
        border: "none",
        borderRadius: "0.375rem",
        color: "white",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "600",
        padding: "0.75rem 2rem",
        width: "100%",
      }} onClick={calculate}>
        年末調整を計算する
      </button>

      <ResultDisplay result={result} />
    </div>
  )
}

export default Page
