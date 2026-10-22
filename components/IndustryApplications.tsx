const INDUSTRIES = [
  { label: "Pharmaceutical", icon: "💊" },
  { label: "Chemical Processing", icon: "⚗️" },
  { label: "Automotive", icon: "🔧" },
  { label: "Food & Beverage", icon: "🥦" },
  { label: "Oil & Gas", icon: "⛽" },
  { label: "Textile", icon: "🧵" },
  { label: "Water Treatment", icon: "💧" },
  { label: "Aerospace", icon: "✈️" },
  { label: "Electronics", icon: "⚡" },
  { label: "Medical Devices", icon: "🏥" },
  { label: "Construction", icon: "🏗️" },
  { label: "Marine", icon: "⚓" },
];

export default function IndustryApplications() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.875rem",
      }}
    >
      {INDUSTRIES.map((industry) => (
        <div
          key={industry.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.75rem 1rem",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "#1e293b",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>{industry.icon}</span>
          {industry.label}
        </div>
      ))}
    </div>
  );
}
