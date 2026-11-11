"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Mail, ArrowLeft, Printer, Trash2 } from "lucide-react";

type Quote = {
  id: string;
  quoteNumber: string;
  enquiryId: string | null;
  clientName: string;
  company: string;
  email: string;
  product: string;
  quantity: string;
  amount: number;
  tax: number;
  total: number;
  status: string;
  validUntil: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export default function QuoteDetailPage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/quotes");
        const data: Quote[] = await res.json();
        const id = window.location.pathname.split("/").pop();
        setQuote(data.find((q) => q.id === id) || null);
      } catch {
        setQuote(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading quote...</div>;
  if (!quote) return <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Quote not found.</div>;

  const formatMoney = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => window.history.back()}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Quote Details</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{quote.quoteNumber}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Client</p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{quote.clientName}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Company</p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{quote.company}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Product</p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{quote.product}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Total</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0d7777", margin: 0 }}>{formatMoney(quote.total)}</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.75rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 1.25rem" }}>Quote Information</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Quantity</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0 }}>{quote.quantity}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Amount</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0 }}>{formatMoney(quote.amount)}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Tax</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0 }}>{formatMoney(quote.tax)}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Status</p>
              <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", backgroundColor: quote.status === "accepted" ? "#16a34a" : quote.status === "sent" ? "#0d7777" : quote.status === "rejected" ? "#ef4444" : "#64748b" }}>
                {quote.status}
              </span>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Valid Until</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0 }}>{new Date(quote.validUntil).toLocaleDateString()}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Email</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, wordBreak: "break-all" }}>{quote.email || "—"}</p>
            </div>
          </div>
          {quote.notes && (
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Notes</p>
              <p style={{ fontSize: "0.95rem", color: "#475569", margin: 0, whiteSpace: "pre-wrap" }}>{quote.notes}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href={`/admin/letters?quoteId=${quote.id}&clientName=${encodeURIComponent(quote.clientName)}&company=${encodeURIComponent(quote.company)}&email=${encodeURIComponent(quote.email)}&product=${encodeURIComponent(quote.product)}&quantity=${encodeURIComponent(quote.quantity)}&amount=${quote.amount}&tax=${quote.tax}&total=${quote.total}&validUntil=${quote.validUntil}&notes=${encodeURIComponent(quote.notes)}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#0d7777",
              color: "#ffffff",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            <Mail size={18} /> Generate Letter
          </Link>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#ffffff",
              color: "#0d7777",
              border: "1px solid #0d7777",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            <Printer size={18} /> Print
          </button>
        </div>
      </div>
    </div>
  );
}
