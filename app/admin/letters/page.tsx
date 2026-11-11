"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, Mail, ArrowLeft, Printer, Download, Plus, Trash2 } from "lucide-react";

type LetterForm = {
  type: string;
  letterDate: string;
  toName: string;
  toCompany: string;
  toEmail: string;
  toAddress: string;
  subject: string;
  body: string;
  items: string;
  subtotal: string;
  tax: string;
  total: string;
  validUntil: string;
  notes: string;
  fromName: string;
  fromCompany: string;
  fromAddress: string;
  fromEmail: string;
  fromPhone: string;
  signature: string;
};

const LETTER_TYPES = [
  { value: "quotation", label: "Quotation Letter" },
  { value: "inquiry-ack", label: "Enquiry Acknowledgement" },
  { value: "proforma-invoice", label: "Proforma Invoice" },
];

export default function AdminLettersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<LetterForm>({
    type: "quotation",
    letterDate: new Date().toISOString().slice(0, 10),
    toName: "",
    toCompany: "",
    toEmail: "",
    toAddress: "",
    subject: "",
    body: "",
    items: "[]",
    subtotal: "0",
    tax: "0",
    total: "0",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    notes: "",
    fromName: "Vaibhavi Enterprises",
    fromCompany: "Vaibhavi Enterprises",
    fromAddress: "N/3, Cama Industrial Estate, Goregaon (E), Mumbai – 400063, Maharashtra, India",
    fromEmail: "response@vaibhavientp.com",
    fromPhone: "+91 98200 52056",
    signature: "Authorised Signatory",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const quoteId = searchParams.get("quoteId");
    if (quoteId) {
      // Prefill from query params passed from the quote detail page
      setForm((prev) => ({
        ...prev,
        type: "quotation",
        toName: searchParams.get("clientName") || "",
        toCompany: searchParams.get("company") || "",
        toEmail: searchParams.get("email") || "",
        subject: `Quotation – ${searchParams.get("quoteId") || ""}`,
        body: `Dear Sir/Madam,\n\nPlease find below our quotation for ${searchParams.get("product") || ""} (${searchParams.get("quantity") || ""}).\n\nKindly revert with your purchase order.\n\nThank you.`,
        subtotal: searchParams.get("amount") || "0",
        tax: searchParams.get("tax") || "0",
        total: searchParams.get("total") || "0",
        validUntil: searchParams.get("validUntil") || "",
        notes: searchParams.get("notes") || "",
        items: JSON.stringify([
          {
            description: searchParams.get("product") || "",
            quantity: searchParams.get("quantity") || "",
            rate: searchParams.get("amount") || "",
            amount: searchParams.get("total") || "",
          },
        ]),
      }));
    }
  }, [searchParams]);

  const handleChange = (field: keyof LetterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

type LetterItem = { description: string; quantity: string; rate: string; amount: string };

  const parseItems = (): LetterItem[] => {
    try {
      return JSON.parse(form.items) as LetterItem[];
    } catch {
      return [];
    }
  };

  const writeItems = (arr: LetterItem[]) => {
    setForm((prev) => ({ ...prev, items: JSON.stringify(arr) }));
  };

  const addItem = () => {
    const arr = parseItems();
    arr.push({ description: "", quantity: "", rate: "", amount: "" });
    writeItems(arr);
  };

  const removeItem = (index: number) => {
    const arr = parseItems();
    arr.splice(index, 1);
    writeItems(arr);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const arr = parseItems();
    (arr[index] as Record<string, string>)[field] = value;
    writeItems(arr);
  };

  const handleGenerate = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/letters/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate letter");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      // Auto-download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.type}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <button
              onClick={() => router.push("/admin")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Business Letters</h1>
              <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Generate quotation, acknowledgement, and invoice letters as PDF.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#0d7777",
                color: "#ffffff",
                padding: "0.7rem 1.25rem",
                borderRadius: "8px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Download size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={16} />} Generate PDF
            </button>
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ffffff", color: "#0d7777", border: "1px solid #0d7777", padding: "0.7rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
                <FileText size={16} /> Open Preview
              </a>
            )}
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "0.75rem 1rem", borderRadius: "6px", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Letter Type</label>
              <select name="type" value={form.type} onChange={(e) => handleChange("type", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none", backgroundColor: "#ffffff" }}>
                {LETTER_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Letter Date</label>
              <input name="letterDate" type="date" value={form.letterDate || ""} onChange={(e) => handleChange("letterDate", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>To Name *</label>
              <input name="toName" value={form.toName} onChange={(e) => handleChange("toName", e.target.value)} placeholder="Recipient name" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>To Company</label>
              <input name="toCompany" value={form.toCompany} onChange={(e) => handleChange("toCompany", e.target.value)} placeholder="Company name" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>To Address</label>
            <textarea name="toAddress" value={form.toAddress} onChange={(e) => handleChange("toAddress", e.target.value)} rows={2} placeholder="Address..." style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Subject *</label>
              <input name="subject" value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} placeholder="Letter subject" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Valid Until</label>
              <input name="validUntil" type="date" value={form.validUntil} onChange={(e) => handleChange("validUntil", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Body</label>
            <textarea name="body" value={form.body} onChange={(e) => handleChange("body", e.target.value)} rows={5} placeholder="Letter body..." style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
          </div>

          {/* Items table */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Line Items</label>
              <button
                onClick={addItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backgroundColor: "#f0fdfa",
                  color: "#0d7777",
                  border: "1px solid #b2dfdf",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Description</th>
                    <th style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Quantity</th>
                    <th style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Rate</th>
                    <th style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Amount</th>
                    <th style={{ textAlign: "center", padding: "0.6rem 0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    try {
                      return parseItems().map((it: LetterItem, i: number) => (
                        <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "0.6rem 0.8rem" }}>
                            <input value={it.description || ""} onChange={(e) => updateItem(i, "description", e.target.value)} style={{ width: "100%", border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }} />
                          </td>
                          <td style={{ padding: "0.6rem 0.8rem" }}>
                            <input value={it.quantity || ""} onChange={(e) => updateItem(i, "quantity", e.target.value)} style={{ width: "100%", border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }} />
                          </td>
                          <td style={{ padding: "0.6rem 0.8rem" }}>
                            <input value={it.rate || ""} onChange={(e) => updateItem(i, "rate", e.target.value)} style={{ width: "100%", border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }} />
                          </td>
                          <td style={{ padding: "0.6rem 0.8rem" }}>
                            <input value={it.amount || ""} onChange={(e) => updateItem(i, "amount", e.target.value)} style={{ width: "100%", border: "none", background: "transparent", outline: "none", fontSize: "0.85rem" }} />
                          </td>
                          <td style={{ padding: "0.6rem 0.8rem" }}>
                            <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem" }}>
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ));
                    } catch {
                      return null;
                    }
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Subtotal</label>
              <input name="subtotal" value={form.subtotal} onChange={(e) => handleChange("subtotal", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Tax</label>
              <input name="tax" value={form.tax} onChange={(e) => handleChange("tax", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Total</label>
              <input name="total" value={form.total} onChange={(e) => handleChange("total", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} rows={3} placeholder="Additional notes..." style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>From Name</label>
              <input name="fromName" value={form.fromName} onChange={(e) => handleChange("fromName", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Signature</label>
              <input name="signature" value={form.signature} onChange={(e) => handleChange("signature", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>From Email</label>
              <input name="fromEmail" value={form.fromEmail} onChange={(e) => handleChange("fromEmail", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>From Phone</label>
              <input name="fromPhone" value={form.fromPhone} onChange={(e) => handleChange("fromPhone", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
