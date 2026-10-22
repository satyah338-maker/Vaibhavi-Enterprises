"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Send, User, Building, Mail, Phone, Package, Hash, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  requirements: string;
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

export default function EnquiryPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", product: "", quantity: "", requirements: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "3rem 0 2.5rem" }}>
        <div className="container">
          <p style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Enquiry
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.75rem" }}>
            Request a Quote
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
            Fill in your requirements below and our technical team will respond within 24 hours with a customised solution.
          </p>
        </div>
      </div>

      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "2rem",
              alignItems: "flex-start",
            }}
            className="enquiry-grid"
          >
            {/* Form */}
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
                <Send size={18} style={{ color: "#0d7777" }} />
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Your Requirements</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <User size={13} style={{ color: "#0d7777" }} /> Full Name *
                    </label>
                    <input id="name" required placeholder="Your full name" style={FIELD_STYLE} value={formData.name} onChange={set("name")} />
                  </div>
                  {/* Company */}
                  <div>
                    <label htmlFor="company" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <Building size={13} style={{ color: "#0d7777" }} /> Company Name
                    </label>
                    <input id="company" placeholder="Your company" style={FIELD_STYLE} value={formData.company} onChange={set("company")} />
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <Mail size={13} style={{ color: "#0d7777" }} /> Email *
                    </label>
                    <input id="email" type="email" required placeholder="your@email.com" style={FIELD_STYLE} value={formData.email} onChange={set("email")} />
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <Phone size={13} style={{ color: "#0d7777" }} /> Phone *
                    </label>
                    <input id="phone" type="tel" required placeholder="10-digit number" style={FIELD_STYLE} value={formData.phone} onChange={set("phone")} />
                  </div>
                  {/* Product */}
                  <div>
                    <label htmlFor="product" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <Package size={13} style={{ color: "#0d7777" }} /> Product *
                    </label>
                    <select id="product" required style={FIELD_STYLE} value={formData.product} onChange={set("product")}>
                      <option value="">Select a product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                      <Hash size={13} style={{ color: "#0d7777" }} /> Quantity
                    </label>
                    <input id="quantity" placeholder="e.g., 100 units" style={FIELD_STYLE} value={formData.quantity} onChange={set("quantity")} />
                  </div>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="requirements" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.375rem" }}>
                    <FileText size={13} style={{ color: "#0d7777" }} /> Specific Requirements
                  </label>
                  <textarea
                    id="requirements"
                    rows={5}
                    placeholder="Describe your substrate, application environment, temperature range, quantity, or any special requirements..."
                    style={{ ...FIELD_STYLE, resize: "none" }}
                    value={formData.requirements}
                    onChange={set("requirements")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? (
                    <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
                  ) : (
                    <><Send size={18} /> Submit Enquiry</>
                  )}
                </button>

                {/* Status */}
                {status && (
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "0.875rem 1rem",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      backgroundColor: status === "success" ? "#f0fdf4" : "#fff1f2",
                      border: `1px solid ${status === "success" ? "#bbf7d0" : "#fecdd3"}`,
                    }}
                  >
                    {status === "success" ? <CheckCircle size={18} style={{ color: "#16a34a", flexShrink: 0, marginTop: "1px" }} /> : <AlertCircle size={18} style={{ color: "#dc2626", flexShrink: 0, marginTop: "1px" }} />}
                    <p style={{ fontSize: "0.875rem", color: status === "success" ? "#15803d" : "#b91c1c", margin: 0, lineHeight: 1.6 }}>
                      {status === "success"
                        ? "Thank you! Your enquiry has been submitted. We'll get back to you within 24 hours."
                        : "There was an error submitting your enquiry. Please try again or contact us directly."}
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: <CheckCircle size={20} />, title: "Quick Response", text: "We respond to all enquiries within 24 working hours." },
                { icon: <User size={20} />, title: "Expert Consultation", text: "Our technical team will recommend the right coating or filter for your application." },
                { icon: <Package size={20} />, title: "Custom Solutions", text: "We tailor grade, thickness, pore size, and color to your exact requirements." },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "#0d7777", marginBottom: "0.5rem" }}>
                    {item.icon}
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                </div>
              ))}

              <div style={{ backgroundColor: "#0d7777", borderRadius: "8px", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>Prefer to call?</h3>
                <a href="tel:+919820052056" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", textDecoration: "none", marginBottom: "0.25rem" }}>+91 98200 52056</a>
                <a href="tel:+919820052057" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>+91 98200 52057</a>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", marginTop: "0.5rem", marginBottom: 0 }}>Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 767px) {
          .enquiry-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}