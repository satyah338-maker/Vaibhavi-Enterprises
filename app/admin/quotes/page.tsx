"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit, FileText, Search, Plus, Mail } from "lucide-react";

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

const STATUS_OPTIONS = ["draft", "sent", "accepted", "rejected"];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/quotes")
      .then((r) => r.json())
      .then((data: Quote[]) => {
        setQuotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/quotes?id=${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    } catch {
      alert("Failed to update status");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;
    try {
      await fetch(`/api/admin/quotes?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert("Failed to delete quote");
    }
  };

  const filtered = quotes.filter(
    (q) =>
      q.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.clientName.toLowerCase().includes(search.toLowerCase()) ||
      q.company.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#16a34a";
      case "sent": return "#0d7777";
      case "rejected": return "#ef4444";
      default: return "#64748b";
    }
  };

  const formatMoney = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#0d7777", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", marginBottom: "0.5rem" }}>
              <FileText size={20} />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Quotes</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Create and manage price quotations for clients.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <input type="text" placeholder="Search quotes..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "0.625rem 1rem", border: "none", outline: "none", fontSize: "0.9rem", minWidth: "220px" }} />
            <button style={{ padding: "0.625rem 1rem", backgroundColor: "#0d7777", color: "#ffffff", border: "none", cursor: "pointer" }}>
              <Search size={16} />
            </button>
          </div>
          <Link href="/admin/quotes/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#0d7777", color: "#ffffff", padding: "0.7rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
            <Plus size={16} /> Create Quote
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading quotes...</div>
        ) : filtered.length === 0 ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "3rem", textAlign: "center", color: "#64748b" }}>No quotes found.</div>
        ) : (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Quote No.</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Client</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Company</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Product</th>
                    <th style={{ textAlign: "right", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Total</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered
                    .slice()
                    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
                    .map((q) => (
                      <tr key={q.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 600, fontFamily: "monospace" }}>{q.quoteNumber}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{q.clientName}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{q.company}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{q.product}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 700, textAlign: "right" }}>{formatMoney(q.total)}</td>
                        <td style={{ padding: "1rem" }}>
                          <select
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value)}
                            disabled={saving === q.id}
                            style={{
                              padding: "0.35rem 0.6rem",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              outline: "none",
                              backgroundColor: saving === q.id ? "#f1f5f9" : "#ffffff",
                              color: saving === q.id ? "#94a3b8" : "#475569",
                              cursor: saving === q.id ? "not-allowed" : "pointer",
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Link href={`/admin/quotes/${q.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#f8fafc", color: "#0d7777", textDecoration: "none", fontSize: "0.85rem" }}>
                              <FileText size={16} />
                            </Link>
                            <Link href={`/admin/letters?quoteId=${q.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#f0fdfa", color: "#0d7777", textDecoration: "none", fontSize: "0.85rem" }}>
                              <Mail size={16} />
                            </Link>
                            <button onClick={() => handleDelete(q.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: "0.85rem" }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
