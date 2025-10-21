import React from "react"

interface InputFieldProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  placeholder?: string
  type?: "number" | "text"
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "number",
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label 
        style={{
          color: "#374151",
          display: "block",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }} 
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        style={{
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          padding: "0.75rem",
          width: "100%",
        }}
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
      />
    </div>
  )
}
