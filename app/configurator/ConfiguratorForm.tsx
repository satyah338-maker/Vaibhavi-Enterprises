"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Snowflake, Droplets, Thermometer, Factory, ArrowRight } from "lucide-react";

interface Substrate {
  value: string;
  label: string;
  icon: string;
  description: string;
}

interface Environment {
  value: string;
  label: string;
  icon: string;
  description: string;
}

interface Temperature {
  value: string;
  label: string;
  description: string;
}

interface Recommendation {
  coating: string;
  brand: string;
  description: string;
  why: string[];
  applications: string[];
  image: string;
}

const SUBSTRATES: Substrate[] = [
  {
    value: "carbon-steel",
    label: "Carbon Steel",
    icon: "Factory",
    description: "Pipes, tanks, structural steel, industrial equipment",
  },
  {
    value: "stainless-steel",
    label: "Stainless Steel",
    icon: "ShieldCheck",
    description: "Process vessels, food equipment, pharmaceutical",
  },
  {
    value: "aluminum",
    label: "Aluminum",
    icon: "Factory",
    description: "Heat exchangers, automotive components, aerospace",
  },
  {
    value: "concrete",
    label: "Concrete / Masonry",
    icon: "Factory",
    description: "Floors, containment areas, secondary containment",
  },
  {
    value: "other",
    label: "Other / Not Sure",
    icon: "Factory",
    description: "Galvanized, copper, alloys, or unknown substrate",
  },
];

const ENVIRONMENTS: Environment[] = [
  {
    value: "chemical",
    label: "Chemical Exposure",
    icon: "Droplets",
    description: "Acids, alkalis, solvents, corrosive chemicals",
  },
  {
    value: "marine",
    label: "Marine / Offshore",
    icon: "Droplets",
    description: "Saltwater, coastal, offshore structures, ships",
  },
  {
    value: "oil-gas",
    label: "Oil & Gas",
    icon: "Flame",
    description: "Pipelines, refineries, valves, petrochemical",
  },
  {
    value: "food",
    label: "Food & Beverage",
    icon: "Snowflake",
    description: "Processing equipment, conveyors, cookware, FDA required",
  },
  {
    value: "high-temp",
    label: "High Temperature",
    icon: "Thermometer",
    description: "Hot surfaces, exhaust, steam, thermal cycling",
  },
  {
    value: "general",
    label: "General / Indoor",
    icon: "Factory",
    description: "Standard industrial environment, minimal exposure",
  },
];

const TEMPERATURES: Temperature[] = [
  { value: "ambient", label: "Ambient (< 60°C)", description: "Normal operating temperatures" },
  { value: "moderate", label: "Moderate (60–150°C)", description: "Warm process surfaces" },
  { value: "high", label: "High (150–260°C)", description: "Hot surfaces, steam, exhaust" },
  { value: "extreme", label: "Extreme (> 260°C)", description: "Very high temperature applications" },
];

const RECOMMENDATIONS: Record<string, Recommendation> = {
  "ptfe": {
    coating: "PTFE (Polytetrafluoroethylene)",
    brand: "Viflon PTFE",
    description: "Non-stick fluoropolymer coating with exceptional chemical resistance and low friction.",
    why: [
      "Virtually inert to most chemicals",
      "Temperature resistance up to 260°C",
      "FDA-compliant formulations available",
      "Excellent release and non-stick properties",
    ],
    applications: ["Chemical equipment", "Food processing", "Molds and dies", "Valves and pumps"],
    image: "/assets/ptfe/non-stick-1.jpg",
  },
  "halar": {
    coating: "HALAR (ECTFE)",
    brand: "Viflon HALAR",
    description: "Ethylene chlorotrifluoroethylene fluoropolymer with superior chemical and permeation resistance.",
    why: [
      "Outstanding chemical resistance",
      "Excellent permeation barrier",
      "UV resistant for outdoor use",
      "Temperature range -60°C to 149°C",
    ],
    applications: ["Chemical storage tanks", "Offshore structures", "Laboratory equipment", "Semiconductor"],
    image: "/assets/halar/halar-coating-1.jpg",
  },
  "fbe": {
    coating: "FBE (Fusion Bonded Epoxy)",
    brand: "Viflon FBE",
    description: "Fusion bonded epoxy coating for corrosion protection of steel in oil & gas and infrastructure.",
    why: [
      "Excellent adhesion to steel",
      "Cathodic disbondment resistance",
      "Cost-effective for large surfaces",
      "Proven since 1994 in India",
    ],
    applications: ["Pipelines", "Structural steel", "Tanks", "Rebar"],
    image: "/assets/fbe/fbe1.jpg",
  },
  "fluoropolymer": {
    coating: "Fluoropolymer (PVDF / FEP / PFA)",
    brand: "Viflon Fluoropolymer",
    description: "Advanced fluoropolymer for high-purity and high-performance applications.",
    why: [
      "High purity for semiconductor and pharma",
      "Excellent thermal stability",
      "Broad chemical compatibility",
      "Multiple grade options (PVDF, FEP, PFA)",
    ],
    applications: ["Semiconductor", "Pharmaceutical", "Chemical processing", "Clean room"],
    image: "/assets/fluoropolymer/ectfe1.jpg",
  },
  "filters": {
    coating: "Vaicon Porous Plastic Filters",
    brand: "Vaicon",
    description: "Sintered UHMWPE/PE porous plastic filter media for filtration applications.",
    why: [
      "Consistent pore distribution",
      "Chemical inertness",
      "FDA-compliant formulations",
      "Custom pore sizes and shapes",
    ],
    applications: ["Sterile filtration", "Vent filters", "Gas filtration", "Clean room HVAC"],
    image: "/assets/porousfilters/porous-plastic-filter-sheets-1.jpg",
  },
};

function getRecommendation(substrate: string, environment: string, temperature: string): Recommendation {
  // Logic for recommendation
  if (environment === "food") {
    return RECOMMENDATIONS.ptfe;
  }
  if (environment === "oil-gas" || (substrate === "carbon-steel" && environment === "marine")) {
    return RECOMMENDATIONS.fbe;
  }
  if (environment === "chemical" && temperature === "high") {
    return RECOMMENDATIONS.halar;
  }
  if (environment === "chemical") {
    return RECOMMENDATIONS.ptfe;
  }
  if (environment === "marine") {
    return RECOMMENDATIONS.fbe;
  }
  if (temperature === "extreme") {
    return RECOMMENDATIONS.fluoropolymer;
  }
  if (substrate === "concrete") {
    return RECOMMENDATIONS.fbe;
  }
  return RECOMMENDATIONS.ptfe;
}

export default function ConfiguratorForm() {
  const [step, setStep] = useState(1);
  const [substrate, setSubstrate] = useState("");
  const [environment, setEnvironment] = useState("");
  const [temperature, setTemperature] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const rec = getRecommendation(substrate, environment, temperature);
      setRecommendation(rec);
    }, 600);
  };

  const isStep1Valid = substrate !== "";
  const isStep2Valid = environment !== "";
  const isStep3Valid = temperature !== "";

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
            Coating Selector
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Find the right coating for your application. Select your substrate,
            environment, and operating temperature to get a personalized
            recommendation.
          </p>
        </div>
      </div>

      {recommendation ? (
        <section style={{ padding: "4rem 0" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(13,119,119,0.9)",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    zIndex: 10,
                  }}
                >
                  Recommended
                </span>
              </div>
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.25rem" }}>
                      {recommendation.brand}
                    </h2>
                    <p style={{ fontSize: "1rem", color: "#0d7777", fontWeight: 600, margin: 0 }}>
                      {recommendation.coating}
                    </p>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#e6f4f4",
                      color: "#0d7777",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Recommended
                  </span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {recommendation.description}
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>
                    Why this coating?
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {recommendation.why.map((w, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                        <span style={{ color: "#0d7777", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>
                    Typical Applications
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {recommendation.applications.map((a, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                          padding: "0.375rem 0.75rem",
                          border: "1px solid #e2e8f0",
                          borderRadius: "4px",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
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
                    Request a Quote <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setRecommendation(null)}
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
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Progress Steps */}
          <section style={{ padding: "2rem 0" }}>
            <div className="container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor:
                          step >= s ? "#0d7777" : "#e2e8f0",
                        color: step >= s ? "#ffffff" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {s}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: step >= s ? "#0d7777" : "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {s === 1 ? "Substrate" : s === 2 ? "Environment" : "Temperature"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Form */}
          <section style={{ padding: "0 0 4rem 0" }}>
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
                {/* Step 1: Substrate */}
                {step === 1 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 1: What&apos;s the substrate material?
                    </h3>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                          gap: "1rem",
                        }}
                      >
                        {SUBSTRATES.map((s) => (
                          <label
                            key={s.value}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "1rem",
                              border: `2px solid ${substrate === s.value ? "#0d7777" : "#e2e8f0"}`,
                              borderRadius: "8px",
                              backgroundColor: substrate === s.value ? "#e6f4f4" : "#ffffff",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => setSubstrate(s.value)}
                          >
                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: substrate === s.value ? "#0d7777" : "#f1f5f9",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: substrate === s.value ? "#ffffff" : "#94a3b8",
                              }}
                            >
                              <Factory size={20} />
                            </div>
                            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}>
                              {s.label}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.description}</span>
                            <input
                              type="radio"
                              name="substrate"
                              value={s.value}
                              checked={substrate === s.value}
                              onChange={() => setSubstrate(s.value)}
                              style={{ display: "none" }}
                            />
                          </label>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                        <button
                          type="submit"
                          disabled={!isStep1Valid || loading}
                          className="btn-primary"
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.9rem",
                            opacity: (!isStep1Valid || loading) ? 0.5 : 1,
                            cursor: (!isStep1Valid || loading) ? "not-allowed" : "pointer",
                          }}
                        >
                          Next <ArrowRight size={16} />
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {/* Step 2: Environment */}
                {step === 2 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 2: What&apos;s the operating environment?
                    </h3>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                          gap: "1rem",
                        }}
                      >
                        {ENVIRONMENTS.map((e) => (
                          <label
                            key={e.value}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "1rem",
                              border: `2px solid ${environment === e.value ? "#0d7777" : "#e2e8f0"}`,
                              borderRadius: "8px",
                              backgroundColor: environment === e.value ? "#e6f4f4" : "#ffffff",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => setEnvironment(e.value)}
                          >
                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: environment === e.value ? "#0d7777" : "#f1f5f9",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: environment === e.value ? "#ffffff" : "#94a3b8",
                              }}
                            >
                              {e.icon === "Flame" ? <Flame size={20} /> : e.icon === "Droplets" ? <Droplets size={20} /> : e.icon === "Snowflake" ? <Snowflake size={20} /> : e.icon === "Thermometer" ? <Thermometer size={20} /> : <Factory size={20} />}
                            </div>
                            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}>
                              {e.label}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{e.description}</span>
                            <input
                              type="radio"
                              name="environment"
                              value={e.value}
                              checked={environment === e.value}
                              onChange={() => setEnvironment(e.value)}
                              style={{ display: "none" }}
                            />
                          </label>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.9rem",
                            color: "#64748b",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                          }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep2Valid || loading}
                          className="btn-primary"
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.9rem",
                            opacity: (!isStep2Valid || loading) ? 0.5 : 1,
                            cursor: (!isStep2Valid || loading) ? "not-allowed" : "pointer",
                          }}
                        >
                          Next <ArrowRight size={16} />
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {/* Step 3: Temperature */}
                {step === 3 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 3: What&apos;s the operating temperature?
                    </h3>
                    <form onSubmit={handleRecommend}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                          gap: "1rem",
                        }}
                      >
                        {TEMPERATURES.map((t) => (
                          <label
                            key={t.value}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "1rem",
                              border: `2px solid ${temperature === t.value ? "#0d7777" : "#e2e8f0"}`,
                              borderRadius: "8px",
                              backgroundColor: temperature === t.value ? "#e6f4f4" : "#ffffff",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => setTemperature(t.value)}
                          >
                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: temperature === t.value ? "#0d7777" : "#f1f5f9",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: temperature === t.value ? "#ffffff" : "#94a3b8",
                              }}
                            >
                              <Thermometer size={20} />
                            </div>
                            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}>
                              {t.label}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{t.description}</span>
                            <input
                              type="radio"
                              name="temperature"
                              value={t.value}
                              checked={temperature === t.value}
                              onChange={() => setTemperature(t.value)}
                              style={{ display: "none" }}
                            />
                          </label>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.9rem",
                            color: "#64748b",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                          }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep3Valid || loading}
                          className="btn-primary"
                          style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.9rem",
                            opacity: (!isStep3Valid || loading) ? 0.5 : 1,
                            cursor: (!isStep3Valid || loading) ? "not-allowed" : "pointer",
                          }}
                        >
                          {loading ? <ArrowRight size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Get Recommendation"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </section>

          <style>{`
            @media (max-width: 767px) {
              .container { padding-left: 1rem; padding-right: 1rem; }
            }
          `}</style>
        </>
      )}
    </div>
  );
}