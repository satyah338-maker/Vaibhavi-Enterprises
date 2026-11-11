"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit, Search, FileText, ArrowRight } from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  product: string;
  application: string;
  quantity: string;
  requirements: string;
  filePath: string | null;
  status: string;
  quoteId: string | null;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = ["new", "quoted", "in-progress", "completed", "delivered"];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/enquiries")
      .then((r) => r.json())
      .then((data: Enquiry[]) => {
        setEnquiries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    } catch {
      alert("Failed to update status");
    } finally {
      setSaving(null);
    }
  };

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (status: string) => {
    switch (status) {
      case "new": return "#64748b";
      case "quoted": return "#0d7777";
      case "in-progress": return "#0a5f5f";
      case "completed": return "#16a34a";
      case "delivered": return "#16a34a";
      default: return "#64748b";
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#0d7777", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", marginBottom: "0.5rem" }}>
              <ClockIcon size={20} />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Enquiries</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Manage customer enquiries from the website.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <input type="text" placeholder="Search enquiries..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "0.625rem 1rem", border: "none", outline: "none", fontSize: "0.9rem", minWidth: "220px" }} />
            <button style={{ padding: "0.625rem 1rem", backgroundColor: "#0d7777", color: "#ffffff", border: "none", cursor: "pointer" }}>
              <Search size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "3rem", textAlign: "center", color: "#64748b" }}>No enquiries found.</div>
        ) : (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Customer</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Company</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Product</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>City</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Quote</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Date</th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered
                    .slice()
                    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
                    .map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>{enq.name}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{enq.company}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{enq.product}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{enq.city}</td>
                        <td style={{ padding: "1rem" }}>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            disabled={saving === enq.id}
                            style={{
                              padding: "0.35rem 0.6rem",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              outline: "none",
                              backgroundColor: saving === enq.id ? "#f1f5f9" : "#ffffff",
                              color: saving === enq.id ? "#94a3b8" : "#475569",
                              cursor: saving === enq.id ? "not-allowed" : "pointer",
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {enq.quoteId ? (
                            <Link href={`/admin/quotes/${enq.quoteId}`} style={{ color: "#0d7777", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                              {enq.quoteId}
                            </Link>
                          ) : (
                            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>{new Date(enq.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            {enq.filePath && (
                              <a href={enq.filePath} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#f8fafc", color: "#0d7777", textDecoration: "none", fontSize: "0.85rem" }}>
                                <FileText size={16} />
                              </a>
                            )}
                            <button onClick={() => handleStatusChange(enq.id, enq.status === "completed" ? "new" : "completed")} disabled={saving === enq.id} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#fef2f2", color: "#ef4444", cursor: saving === enq.id ? "not-allowed" : "pointer", fontSize: "0.85rem", opacity: saving === enq.id ? 0.7 : 1 }}>
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

function ClockIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
