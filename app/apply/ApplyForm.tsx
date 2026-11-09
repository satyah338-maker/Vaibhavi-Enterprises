"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, User, Mail, Phone, MapPin, Briefcase, CheckCircle, ArrowRight } from "lucide-react";

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  yearsInBusiness: string;
  currentCoatings: string;
  coatingTypes: string[];
  monthlyCapacity: string;
  hasCertifications: boolean;
  certificationDetails: string;
  message: string;
}

const MAHARASHTRA_CITIES = [
  "Mumbai",
  "Pune",
  "Nashik",
  "Thane",
  "Nagpur",
  "Aurangabad",
  "Solapur",
  "Kolhapur",
  "Amravati",
  "Other",
];

const BUSINESS_TYPES = [
  "Coating Applicator",
  "Distributor / Stockist",
  "Fabricator / EPC Contractor",
  "Industrial Service Provider",
  "Other",
];

const COATING_TYPES = [
  "PTFE",
  "HALAR (ECTFE)",
  "FBE (Fusion Bonded Epoxy)",
  "Fluoropolymer (PVDF, FEP, PFA)",
  "Vaicon Porous Plastic Filters",
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

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "Maharashtra",
    businessType: "",
    yearsInBusiness: "",
    currentCoatings: "",
    coatingTypes: [],
    monthlyCapacity: "",
    hasCertifications: false,
    certificationDetails: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleCoating = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      coatingTypes: prev.coatingTypes.includes(type)
        ? prev.coatingTypes.filter((t) => t !== type)
        : [...prev.coatingTypes, type],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
    }, 1000);
  };

  const isStep1Valid =
    formData.companyName &&
    formData.contactPerson &&
    formData.email &&
    formData.phone &&
    formData.city &&
    formData.businessType;

  const isStep2Valid =
    formData.yearsInBusiness &&
    formData.coatingTypes.length > 0;

  const cityOptions = MAHARASHTRA_CITIES.map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  const businessTypeOptions = BUSINESS_TYPES.map((t) => (
    <option key={t} value={t}>
      {t}
    </option>
  ));

  const yearsOptions = [
    { value: "0-2", label: "0\u20132 years" },
    { value: "2-5", label: "2\u20135 years" },
    { value: "5-10", label: "5\u201310 years" },
    { value: "10+", label: "10+ years" },
  ].map((y) => (
    <option key={y.value} value={y.value}>
      {y.label}
    </option>
  ));

  return (
    <>
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
            Become an Authorized Applicator
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Partner with Vaibhavi Enterprises to offer certified PTFE, HALAR,
            FBE coatings and Vaicon filters in your region. Join our network
            of approved applicators across Maharashtra.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <section style={{ padding: "4rem 0", backgroundColor: "#f0fdf4" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#bbf7d0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <CheckCircle size={32} style={{ color: "#16a34a" }} />
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#15803d", marginBottom: "0.5rem" }}>
              Application Submitted
            </h2>
            <p style={{ color: "#15803d", fontSize: "1rem", marginBottom: "1.5rem" }}>
              Thank you, {formData.contactPerson}. We&apos;ll review your
              application and get back to you within 5 working days.
            </p>
            <Link
              href="/"
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
              Back to Home <ArrowRight size={16} />
            </Link>
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
                      {s === 1 ? "Company" : s === 2 ? "Experience" : "Submit"}
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
                {/* Step 1: Company Details */}
                {step === 1 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 1: Company Details
                    </h3>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        <div>
                          <label
                            htmlFor="companyName"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Company Name *
                          </label>
                          <div style={{ position: "relative" }}>
                            <Building2 size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                            <input
                              id="companyName"
                              placeholder="Your company name"
                              value={formData.companyName}
                              onChange={set("companyName")}
                              style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="contactPerson"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Contact Person *
                          </label>
                          <div style={{ position: "relative" }}>
                            <User size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                            <input
                              id="contactPerson"
                              placeholder="Your full name"
                              value={formData.contactPerson}
                              onChange={set("contactPerson")}
                              style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        <div>
                          <label
                            htmlFor="email"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Email *
                          </label>
                          <div style={{ position: "relative" }}>
                            <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                            <input
                              id="email"
                              type="email"
                              placeholder="you@company.com"
                              value={formData.email}
                              onChange={set("email")}
                              style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Phone *
                          </label>
                          <div style={{ position: "relative" }}>
                            <Phone size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                            <input
                              id="phone"
                              type="tel"
                              placeholder="+91 98xxx xxxxxx"
                              value={formData.phone}
                              onChange={set("phone")}
                              style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          htmlFor="city"
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            marginBottom: "0.375rem",
                          }}
                        >
                          City / Region *
                        </label>
                        <div style={{ position: "relative" }}>
                          <MapPin size={16} style={{ position: "absolute", left: "0.875rem", top: "1rem", color: "#0d7777" }} />
                          <select
                            id="city"
                            value={formData.city}
                            onChange={set("city")}
                            style={FIELD_STYLE}
                            required
                          >
                            <option value="">Select city</option>
                            {cityOptions}
                          </select>
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          htmlFor="businessType"
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            marginBottom: "0.375rem",
                          }}
                        >
                          Business Type *
                        </label>
                        <select
                          id="businessType"
                          value={formData.businessType}
                          onChange={set("businessType")}
                          style={FIELD_STYLE}
                          required
                        >
                          <option value="">Select business type</option>
                          {businessTypeOptions}
                        </select>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

                {/* Step 2: Experience & Capabilities */}
                {step === 2 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 2: Experience &amp; Capabilities
                    </h3>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        <div>
                          <label
                            htmlFor="yearsInBusiness"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Years in Business *
                          </label>
                          <select
                            id="yearsInBusiness"
                            value={formData.yearsInBusiness}
                            onChange={set("yearsInBusiness")}
                            style={FIELD_STYLE}
                            required
                          >
                            <option value="">Select</option>
                            {yearsOptions}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="monthlyCapacity"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                              marginBottom: "0.375rem",
                            }}
                          >
                            Monthly Coating Capacity (sq. m.)
                          </label>
                          <input
                            id="monthlyCapacity"
                            type="number"
                            placeholder="e.g., 5000"
                            value={formData.monthlyCapacity}
                            onChange={set("monthlyCapacity")}
                            style={FIELD_STYLE}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          htmlFor="currentCoatings"
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            marginBottom: "0.375rem",
                          }}
                        >
                          Coatings Currently Applied
                        </label>
                        <textarea
                          id="currentCoatings"
                          rows={3}
                          placeholder="e.g., Powder coating, Epoxy, PU..."
                          value={formData.currentCoatings}
                          onChange={set("currentCoatings")}
                          style={{ ...FIELD_STYLE, resize: "none" }}
                        />
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            marginBottom: "0.75rem",
                          }}
                        >
                          Coating Types Interested In
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.75rem",
                          }}
                        >
                          {COATING_TYPES.map((type) => (
                            <label
                              key={type}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                color: "#1e293b",
                                border: `1px solid ${formData.coatingTypes.includes(type) ? "#0d7777" : "#e2e8f0"}`,
                                backgroundColor: formData.coatingTypes.includes(type) ? "#e6f4f4" : "#ffffff",
                                padding: "0.5rem 0.875rem",
                                borderRadius: "6px",
                                transition: "all 0.2s ease",
                              }}
                              onClick={() => toggleCoating(type)}
                            >
                              <input
                                type="checkbox"
                                checked={formData.coatingTypes.includes(type)}
                                onChange={() => toggleCoating(type)}
                                style={{ display: "none" }}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.hasCertifications}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                hasCertifications: !prev.hasCertifications,
                              }))
                            }
                            style={{ width: "1rem", height: "1rem" }}
                          />
                          Have relevant certifications (ISO, NABL, etc.)?
                        </label>
                        {formData.hasCertifications && (
                          <div style={{ marginTop: "0.75rem" }}>
                            <label
                              htmlFor="certificationDetails"
                              style={{
                                display: "block",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color: "#1e293b",
                                marginBottom: "0.375rem",
                              }}
                            >
                              Certification Details
                            </label>
                            <input
                              id="certificationDetails"
                              placeholder="e.g., ISO 9001, NABL, SSPC..."
                              value={formData.certificationDetails}
                              onChange={set("certificationDetails")}
                              style={FIELD_STYLE}
                            />
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

                {/* Step 3: Review & Submit */}
                {step === 3 && (
                  <>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                      Step 3: Review &amp; Submit
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Company
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.companyName}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Contact Person
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.contactPerson}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Email
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.email}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Phone
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.phone}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          City / Region
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.city}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Business Type
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.businessType}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Years in Business
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>{formData.yearsInBusiness}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          Coating Types
                        </p>
                        <p style={{ fontSize: "0.95rem", color: "#1e293b", margin: 0 }}>
                          {formData.coatingTypes.join(", ") || "None selected"}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        htmlFor="message"
                        style={{
                          display: "block",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#1e293b",
                          marginBottom: "0.375rem",
                        }}
                      >
                        Additional Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Any additional information about your application..."
                        value={formData.message}
                        onChange={set("message")}
                        style={{ ...FIELD_STYLE, resize: "none" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary"
                        style={{
                          padding: "0.75rem 2rem",
                          fontSize: "0.95rem",
                          opacity: loading ? 0.7 : 1,
                          cursor: loading ? "not-allowed" : "pointer",
                        }}
                      >
                        {loading ? <ArrowRight size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Submit Application"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
            <div className="container">
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", textAlign: "center", marginBottom: "2rem" }}>
                Why Partner With Vaibhavi?
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                  gap: "2rem",
                }}
              >
                {[
                  {
                    title: "Certified Coating Systems",
                    text: "Whitford Quality Approved, ISO 9001:2015, FDA-compliant formulations.",
                  },
                  {
                    title: "Technical Training",
                    text: "We provide application training and technical support for our coating systems.",
                  },
                  {
                    title: "Marketing Support",
                    text: "Co-branded materials, case studies, and project references for your sales efforts.",
                  },
                  {
                    title: "Maharashtra Territory Rights",
                    text: "Exclusive or preferred applicator rights for your city or region.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0d7777",
                        marginBottom: "1rem",
                      }}
                    >
                      <Briefcase size={20} />
                    </div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
                      {benefit.title}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <style>{`
            @media (max-width: 767px) {
              .container { padding-left: 1rem; padding-right: 1rem; }
              section > div > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </>
      )}
    </>
  );
}