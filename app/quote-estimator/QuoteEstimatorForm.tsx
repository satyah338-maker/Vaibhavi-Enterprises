"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Factory } from "lucide-react";

interface CoatingOption {
  value: string;
  label: string;
  brand: string;
  baseRateMin: number; // INR per sq.m.
  baseRateMax: number;
  description: string;
}

interface ThicknessOption {
  value: string;
  label: string;
  multiplier: number;
  description: string;
}

const COATINGS: CoatingOption[] = [
  {
    value: "ptfe",
    label: "PTFE Coating",
    brand: "Viflon PTFE",
    baseRateMin: 400,
    baseRateMax: 800,
    description: "Non-stick fluoropolymer, chemical resistant, up to 260°C",
  },
  {
    value: "halar",
    label: "HALAR (ECTFE) Coating",
    brand: "Viflon HALAR",
    baseRateMin: 600,
    baseRateMax: 1200,
    description: "Superior chemical resistance, permeation barrier",
  },
  {
    value: "fbe",
    label: "FBE Coating",
    brand: "Viflon FBE",
    baseRateMin: 200,
    baseRateMax: 400,
    description: "Fusion bonded epoxy for pipelines and structural steel",
  },
  {
    value: "fluoropolymer",
    label: "Fluoropolymer (PVDF/FEP/PFA)",
    brand: "Viflon Fluoropolymer",
    baseRateMin: 800,
    baseRateMax: 1500,
    description: "High-purity advanced fluoropolymer for demanding applications",
  },
  {
    value: "filters",
    label: "Vaicon Porous Plastic Filters",
    brand: "Vaicon",
    baseRateMin: 300,
    baseRateMax: 600,
    description: "Sintered UHMWPE/PE filter media for filtration",
  },
];

const THICKNESSES: ThicknessOption[] = [
  { value: "25-50", label: "25–50 microns", multiplier: 0.8, description: "Thin film, light duty" },
  { value: "50-100", label: "50–100 microns", multiplier: 1.0, description: "Standard coating thickness" },
  { value: "100-150", label: "100–150 microns", multiplier: 1.3, description: "Heavy duty, enhanced protection" },
  { value: "150+", label: "150+ microns", multiplier: 1.6, description: "Maximum protection, extreme environments" },
];

const FIELD_STYLE = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  fontSize: "0.9rem",
  color: "#1e293b",
  backgroundColor: "#ffffff",
  outline: "none",
  fontFamily: "inherit",
} as React.CSSProperties;

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function QuoteEstimatorForm() {
  const [coating, setCoating] = useState<CoatingOption | null>(null);
  const [surfaceArea, setSurfaceArea] = useState("");
  const [thickness, setThickness] = useState<ThicknessOption | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = () => {
    if (!coating || !surfaceArea || !thickness) return null;
    const area = parseFloat(surfaceArea);
    if (isNaN(area) || area <= 0) return null;
    const baseMin = coating.baseRateMin * area * thickness.multiplier;
    const baseMax = coating.baseRateMax * area * thickness.multiplier;
    // Add ~15% for surface preparation and application
    const prepMin = baseMin * 0.15;
    const prepMax = baseMax * 0.15;
    return {
      min: Math.round(baseMin + prepMin),
      max: Math.round(baseMax + prepMax),
      area,
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coating || !surfaceArea || !thickness) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 500);
  };

  const isValid = coating !== null && surfaceArea !== "" && thickness !== null;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <div className="accent-line" />
          <h1
            className="section-heading"
            style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
          >
            Instant Quote Estimator
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Get a ballpark coating cost estimate. Select coating type, surface
            area, and thickness for an instant price range.
          </p>
        </div>
      </div>

      {/* Estimator Form */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "2.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
              Estimate Your Coating Cost
            </h3>

            {!showResult ? (
              <form onSubmit={handleSubmit}>
                {/* Coating Type */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="coating"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Select Coating Type *
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {COATINGS.map((c) => (
                      <label
                        key={c.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem 1rem",
                          border: `2px solid ${coating?.value === c.value ? "#0d7777" : "#e2e8f0"}`,
                          borderRadius: "8px",
                          backgroundColor: coating?.value === c.value ? "#e6f4f4" : "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => setCoating(c)}
                      >
                        <input
                          type="radio"
                          name="coating"
                          value={c.value}
                          checked={coating?.value === c.value}
                          onChange={() => setCoating(c)}
                          style={{ display: "none" }}
                        />
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: coating?.value === c.value ? "#0d7777" : "#f1f5f9",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: coating?.value === c.value ? "#ffffff" : "#94a3b8",
                            flexShrink: 0,
                          }}
                        >
                          <Factory size={16} />
                        </div>
                        <div>
                          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", display: "block" }}>
                            {c.label}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>
                            {c.brand}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.5rem" }}>
                    {coating?.description}
                  </p>
                </div>

                {/* Surface Area */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="surfaceArea"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Surface Area (sq. m.) *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Factory size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                    <input
                      id="surfaceArea"
                      type="number"
                      placeholder="e.g., 100"
                      value={surfaceArea}
                      onChange={(e) => setSurfaceArea(e.target.value)}
                      style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
                      required
                    />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.5rem" }}>
                    Total surface area to be coated in square meters
                  </p>
                </div>

                {/* Thickness */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="thickness"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Coating Thickness *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                    }}
                  >
                    {THICKNESSES.map((t) => (
                      <label
                        key={t.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem 1rem",
                          border: `2px solid ${thickness?.value === t.value ? "#0d7777" : "#e2e8f0"}`,
                          borderRadius: "8px",
                          backgroundColor: thickness?.value === t.value ? "#e6f4f4" : "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => setThickness(t)}
                      >
                        <input
                          type="radio"
                          name="thickness"
                          value={t.value}
                          checked={thickness?.value === t.value}
                          onChange={() => setThickness(t)}
                          style={{ display: "none" }}
                        />
                        <div>
                          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", display: "block" }}>
                            {t.label}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>
                            {t.description}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <button
                    type="submit"
                    disabled={!isValid || loading}
                    className="btn-primary"
                    style={{
                      padding: "0.75rem 2rem",
                      fontSize: "0.95rem",
                      opacity: (!isValid || loading) ? 0.5 : 1,
                      cursor: (!isValid || loading) ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? <ArrowRight size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Get Estimate"}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#e6f4f4",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <Factory size={40} style={{ color: "#0d7777" }} />
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: "0.5rem" }}>
                  Estimated Cost
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "3rem", fontWeight: 800, color: "#0d7777" }}>
                    {formatINR(estimate!.min)}
                  </span>
                  <span style={{ fontSize: "1.5rem", color: "#64748b" }}>{" – "}</span>
                  <span style={{ fontSize: "3rem", fontWeight: 800, color: "#0d7777" }}>
                    {formatINR(estimate!.max)}
                  </span>
                  <span style={{ fontSize: "1rem", color: "#64748b" }}> INR</span>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Estimated for {estimate!.area.toLocaleString()} sq. m. at {thickness!.label} thickness
                </p>
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 0.75rem" }}>
                    What&apos;s included:
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                      <span style={{ color: "#0d7777", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      Coating material ({coating!.brand})
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                      <span style={{ color: "#0d7777", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      Surface preparation &amp; application
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                      <span style={{ color: "#0d7777", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      Quality testing &amp; inspection
                    </li>
                  </ul>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
                  <p style={{ margin: "0 0 0.5rem" }}>
                    <strong>Note:</strong> This is a ballpark estimate for budgeting purposes only.
                    Actual pricing may vary based on surface condition, location, project complexity,
                    and volume. Contact us for a firm quotation.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Link
                    href="/enquiry"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "#0d7777",
                      color: "#ffffff",
                      padding: "0.7rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                  >
                    Request Formal Quote <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setShowResult(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "#ffffff",
                      color: "#64748b",
                      border: "1px solid #e2e8f0",
                      padding: "0.7rem 1.5rem",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    New Estimate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>
    </div>
  );
}