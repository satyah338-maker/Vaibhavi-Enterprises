"use client";

import { useState } from "react";
import { Search, Clock } from "lucide-react";

interface QuoteStatus {
  quoteNumber: string;
  status: "received" | "quoted" | "in-progress" | "completed" | "delivered";
  statusLabel: string;
  statusColor: string;
  submittedDate: string;
  estimatedCompletion: string;
  customerName: string;
  product: string;
  notes: string;
}

const MOCK_QUOTES: Record<string, QuoteStatus> = {
  "VE-2026-001": {
    quoteNumber: "VE-2026-001",
    status: "quoted",
    statusLabel: "Quotation Sent",
    statusColor: "#0d7777",
    submittedDate: "2026-10-20",
    estimatedCompletion: "2026-11-15",
    customerName: "ABC Chemicals Pvt. Ltd.",
    product: "PTFE Coating",
    notes: "Quotation emailed on 2026-10-22. Awaiting client confirmation.",
  },
  "VE-2026-002": {
    quoteNumber: "VE-2026-002",
    status: "in-progress",
    statusLabel: "Coating in Progress",
    statusColor: "#0a5f5f",
    submittedDate: "2026-10-25",
    estimatedCompletion: "2026-11-20",
    customerName: "XYZ Pharma Ltd.",
    product: "HALAR (ECTFE) Coating",
    notes: "Surface preparation complete. Coating application underway.",
  },
  "VE-2026-003": {
    quoteNumber: "VE-2026-003",
    status: "completed",
    statusLabel: "Completed",
    statusColor: "#16a34a",
    submittedDate: "2026-09-10",
    estimatedCompletion: "2026-09-25",
    customerName: "PQR Industries",
    product: "FBE Coating",
    notes: "Coating completed and holiday tested. Ready for dispatch.",
  },
};

interface TrackQuoteFormProps {
  onLookup?: (quoteNumber: string) => void;
}

export default function TrackQuoteForm({ onLookup }: TrackQuoteFormProps) {
  const [quoteNumber, setQuoteNumber] = useState("");
  const [result, setResult] = useState<QuoteStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    if (onLookup) {
      onLookup(quoteNumber.trim().toUpperCase());
    }

    setTimeout(() => {
      const quote = MOCK_QUOTES[quoteNumber.trim().toUpperCase()];
      setLoading(false);
      if (quote) {
        setResult(quote);
      } else {
        setError(
          "Quote number not found. Please check your enquiry confirmation email or contact us at response@vaibhavientp.com."
        );
      }
    }, 800);
  };

  const statusBadge = (status: QuoteStatus) => (
    <span
      style={{
        display: "inline-block",
        padding: "0.375rem 0.875rem",
        borderRadius: "6px",
        fontSize: "0.8rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#ffffff",
        backgroundColor: status.statusColor,
      }}
    >
      {status.statusLabel}
    </span>
  );

  return (
    <>
      {/* Lookup Form */}
      <section style={{ padding: "4rem 0" }}>
        <div
          className="container"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label
                htmlFor="quoteNumber"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: "0.375rem",
                }}
              >
                Quote Number
              </label>
              <input
                id="quoteNumber"
                type="text"
                placeholder="e.g., VE-2026-001"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  textTransform: "uppercase",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: "0.625rem 1.5rem",
                fontSize: "0.9rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <Clock size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Search size={18} />} Track
            </button>
          </form>
          {error && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.875rem 1rem",
                borderRadius: "6px",
                backgroundColor: "#fff1f2",
                border: "1px solid #fecdd3",
                color: "#b91c1c",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
              }}
            >
              <span style={{ color: "#dc2626", flexShrink: 0, marginTop: "1px" }}>!</span>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote Status Result */}
      {result && (
        <section style={{ padding: "4rem 0" }}>
          <div
            className="container"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0d7777",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Quote Status
                </h2>
                {statusBadge(result)}
              </div>
              <div style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Quote Number
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                    {result.quoteNumber}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Customer
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                    {result.customerName}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Product / Service
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                    {result.product}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Submitted On
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                    {result.submittedDate}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Estimated Completion
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                    {result.estimatedCompletion}
                  </p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Status Notes
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    {result.notes}
                  </p>
                </div>
              </div>
              <div style={{ padding: "1.5rem 1.75rem", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                  Need help? Email{" "}
                  <a href="mailto:response@vaibhavientp.com" style={{ color: "#0d7777", fontWeight: 600 }}>
                    response@vaibhavientp.com
                  </a>{" "}
                  or call <a href="tel:+919820052056" style={{ color: "#0d7777", fontWeight: 600 }}>+91 98200 52056</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}