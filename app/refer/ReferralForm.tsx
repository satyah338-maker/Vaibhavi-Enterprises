"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

interface FormData {
  referrerName: string;
  referrerEmail: string;
  referredName: string;
  referredCompany: string;
  referredEmail: string;
  referredPhone: string;
  message: string;
}

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

interface ReferralFormProps {
  onSubmit?: (data: FormData) => void;
}

export default function ReferralForm({ onSubmit }: ReferralFormProps) {
  const [formData, setFormData] = useState<FormData>({
    referrerName: "",
    referrerEmail: "",
    referredName: "",
    referredCompany: "",
    referredEmail: "",
    referredPhone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (onSubmit) {
      onSubmit(formData);
    }

    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      setFormData({
        referrerName: "",
        referrerEmail: "",
        referredName: "",
        referredCompany: "",
        referredEmail: "",
        referredPhone: "",
        message: "",
      });
    }, 800);
  };

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/enquiry?ref=${encodeURIComponent(formData.referrerEmail || "customer")}`
    : "/enquiry?ref=";

  return (
    <>
      {/* Referral Form */}
      <div>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "2rem",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
            Tell Us About Your Referral
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label
                  htmlFor="referrerName"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    marginBottom: "0.375rem",
                  }}
                >
                  Your Name *
                </label>
                <input
                  id="referrerName"
                  placeholder="Your full name"
                  value={formData.referrerName}
                  onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                  style={FIELD_STYLE}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="referrerEmail"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    marginBottom: "0.375rem",
                  }}
                >
                  Your Email *
                </label>
                <input
                  id="referrerEmail"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.referrerEmail}
                  onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                  style={FIELD_STYLE}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="referredName"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: "0.375rem",
                }}
              >
                  Referred Person&apos;s Name *
              </label>
              <input
                id="referredName"
                placeholder="Their full name"
                value={formData.referredName}
                onChange={(e) => setFormData({ ...formData, referredName: e.target.value })}
                style={FIELD_STYLE}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="referredCompany"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: "0.375rem",
                }}
              >
                Company Name
              </label>
              <input
                id="referredCompany"
                placeholder="Their company"
                value={formData.referredCompany}
                onChange={(e) => setFormData({ ...formData, referredCompany: e.target.value })}
                style={FIELD_STYLE}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label
                  htmlFor="referredEmail"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    marginBottom: "0.375rem",
                  }}
                >
                  Their Email *
                </label>
                <input
                  id="referredEmail"
                  type="email"
                  placeholder="their@company.com"
                  value={formData.referredEmail}
                  onChange={(e) => setFormData({ ...formData, referredEmail: e.target.value })}
                  style={FIELD_STYLE}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="referredPhone"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    marginBottom: "0.375rem",
                  }}
                >
                  Their Phone
                </label>
                <input
                  id="referredPhone"
                  type="tel"
                  placeholder="+91 98xxx xxxxxx"
                  value={formData.referredPhone}
                  onChange={(e) => setFormData({ ...formData, referredPhone: e.target.value })}
                  style={FIELD_STYLE}
                />
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
                Personal Message (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell them why you recommend Vaibhavi Enterprises..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...FIELD_STYLE, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.95rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <ArrowRight size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Send Referral"}
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            backgroundColor: "#0d7777",
            borderRadius: "8px",
            padding: "1.75rem",
            color: "#ffffff",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>
            Referral Rewards
          </h3>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>First successful referral</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>5% off</span>
            </div>
            <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", backgroundColor: "#ffffff", width: "40%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>Third successful referral</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>10% off</span>
            </div>
            <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", backgroundColor: "#ffffff", width: "80%" }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>Fifth successful referral</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff" }}>Free coating consultation</span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1.75rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1rem" }}>
            Share Your Link
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1rem" }}>
            Copy and share your unique referral link with colleagues in
            the manufacturing and processing industries.
          </p>
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "0.75rem",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              color: "#0d7777",
              wordBreak: "break-all",
            }}
          >
            {referralLink}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Hi! I recommend Vaibhavi Enterprises for PTFE, HALAR, FBE coatings and Vaicon filters. Check them out: " + referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#25d366",
                color: "#ffffff",
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Phone size={16} /> WhatsApp
            </a>
            <a
              href={`mailto:?subject=Vaibhavi Enterprises - Coating & Filter Solutions&body=${encodeURIComponent("Hi,\n\nI wanted to recommend Vaibhavi Enterprises for your coating and filter needs. They are ISO 9001:2015 certified and Whitford Quality Approved.\n\nLearn more: " + referralLink + "\n\nBest regards," + formData.referrerName)}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#ffffff",
                color: "#0d7777",
                border: "1px solid #e2e8f0",
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      </div>

      {status === "success" && (
        <section style={{ padding: "4rem 0", backgroundColor: "#f0fdf4" }}>
          <div
            className="container"
            style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
          >
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
              <span style={{ color: "#16a34a", fontSize: "32px" }}>✓</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#15803d", marginBottom: "0.5rem" }}>
              Referral Sent!
            </h2>
            <p style={{ color: "#15803d", fontSize: "1rem", marginBottom: "1.5rem" }}>
              Thank you for referring {formData.referredName}. We&apos;ll reach out to them shortly.
            </p>
          </div>
        </section>
      )}
    </>
  );
}