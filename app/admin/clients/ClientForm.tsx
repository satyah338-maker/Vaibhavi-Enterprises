"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Save, ArrowLeft, Mail } from "lucide-react";

type Client = {
  id?: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  industry: string;
  status: string;
};

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  client?: Client;
};

export default function ClientForm({ mode, client }: Props) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit" && !!client;
  const id = isEdit ? (client!.id || params.id) : undefined;

  const [form, setForm] = useState<Client>({
    id: "",
    name: client?.name || "",
    contactPerson: client?.contactPerson || "",
    email: client?.email || "",
    phone: client?.phone || "",
    city: client?.city || "",
    industry: client?.industry || "",
    status: client?.status || "active",
  });

  const handleChange = (field: keyof Client, value: string) => {
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
      name: form.name,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      city: form.city,
      industry: form.industry,
      status: form.status,
    };

    try {
      if (isEdit && id) {
        const res = await fetch(`/api/admin/clients?id=${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update client");
      } else {
        const res = await fetch("/api/admin/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create client");
      }
      router.push("/admin/clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "640px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => router.push("/admin/clients")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              {isEdit ? "Edit Client" : "Add New Client"}
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
              {isEdit ? "Update client details." : "Add a new client to the database."}
            </p>
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
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Client Name *</label>
              <input name="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="e.g. ONGC" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Contact Person</label>
              <input name="contactPerson" value={form.contactPerson} onChange={(e) => handleChange("contactPerson", e.target.value)} placeholder="e.g. Ramesh Kulkarni" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Email</label>
              <input name="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="contact@company.com" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Phone</label>
              <input name="phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+91 98200 52056" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>City</label>
              <input name="city" value={form.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="e.g. Mumbai" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Industry</label>
              <input name="industry" value={form.industry} onChange={(e) => handleChange("industry", e.target.value)} placeholder="e.g. Oil & Gas" style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Status</label>
            <select name="status" value={form.status} onChange={(e) => handleChange("status", e.target.value)} style={{ padding: "0.625rem 0.875rem", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.9rem", outline: "none", backgroundColor: "#ffffff" }}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="lead">Lead</option>
            </select>
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: "#0d7777", color: "#ffffff", border: "none", borderRadius: "8px", padding: "0.8rem 1.5rem", fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", gap: "0.5rem", alignSelf: "flex-start" }}>
            {loading ? <><Mail size={16} /> Saving...</> : <><Save size={16} /> {isEdit ? "Update Client" : "Create Client"}</>}
          </button>
        </form>
      </div>
    </div>
  );
}
