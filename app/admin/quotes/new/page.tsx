"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Mail } from "lucide-react";

type QuoteForm = {
  quoteNumber: string;
  enquiryId: string;
  clientName: string;
  company: string;
  email: string;
  product: string;
  quantity: string;
  amount: string;
  tax: string;
  total: string;
  status: string;
  validUntil: string;
  notes: string;
};

export default function NewQuotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<QuoteForm>({
    quoteNumber: `VE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    enquiryId: "",
    clientName: "",
    company: "",
    email: "",
    product: "",
    quantity: "",
    amount: "",
    tax: "",
    total: "",
    status: "draft",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    notes: "",
  });

  const handleChange = (field: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runSubmit();
  };

  async function runSubmit() {
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      amount: Number(form.amount) || 0,
      tax: Number(form.tax) || 0,
      total: Number(form.total) || 0,
    };

    try {
      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create quote");
      const data = await res.json();
      router.push(`/admin/quotes/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => router.push("/admin/quotes")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Create Quote</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Generate a price quotation for a client.</p>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "0.75rem 1rem", borderRadius: "6px", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Quote Number *</label>
              <input name="quoteNumber" value={form.quoteNumber} onChange={(e) => handleChange("quoteNumber", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Status</label>
              <select name="status" value={form.status} onChange={(e) => handleChange("status", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none", backgroundColor: "#ffffff" }}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Client Name *</label>
              <input name="clientName" value={form.clientName} onChange={(e) => handleChange("clientName", e.target.value)} placeholder="e.g. Ramesh Kulkarni" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Company *</label>
              <input name="company" value={form.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="e.g. ONGC" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Email</label>
              <input name="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="contact@company.com" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Valid Until</label>
              <input name="validUntil" type="date" value={form.validUntil} onChange={(e) => handleChange("validUntil", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Product *</label>
              <input name="product" value={form.product} onChange={(e) => handleChange("product", e.target.value)} placeholder="e.g. PTFE Coating" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Quantity *</label>
              <input name="quantity" value={form.quantity} onChange={(e) => handleChange("quantity", e.target.value)} placeholder="e.g. 500 sq. m." style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Amount (₹)</label>
              <input name="amount" type="number" value={form.amount} onChange={(e) => handleChange("amount", e.target.value)} placeholder="0" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Tax (₹)</label>
              <input name="tax" type="number" value={form.tax} onChange={(e) => handleChange("tax", e.target.value)} placeholder="0" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Total (₹)</label>
              <input name="total" type="number" value={form.total} onChange={(e) => handleChange("total", e.target.value)} placeholder="0" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} rows={3} placeholder="Terms and conditions..." style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: "#0d7777", color: "#ffffff", border: "none", borderRadius: "8px", padding: "0.8rem 1.5rem", fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", gap: "0.5rem", alignSelf: "flex-start" }}>
            {loading ? <><Mail size={16} /> Creating...</> : <><Save size={16} /> Create Quote</>}
          </button>
        </form>
      </div>
    </div>
  );
}
