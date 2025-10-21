import React from "react"

interface SectionProps {
  title: string
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginBottom: "1.5rem",
      padding: "1.5rem",
    }}>
      <h2 style={{
        color: "#1f2937",
        marginBottom: "1rem",
        marginTop: 0,
      }}>{title}</h2>
      {children}
    </div>
  )
}
