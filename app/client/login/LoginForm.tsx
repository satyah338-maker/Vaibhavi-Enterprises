"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

interface FormData {
  email: string;
  password: string;
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

interface LoginFormProps {
  onSubmit?: (data: FormData) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (onSubmit) {
      onSubmit(formData);
    }

    setTimeout(() => {
      setLoading(false);
      if (formData.email && formData.password) {
        alert("Login successful! Redirecting to client dashboard...");
      } else {
        setError("Invalid email or password.");
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          Email Address
        </label>
        <div style={{ position: "relative" }}>
          <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "0.95rem", color: "#0d7777" }} />
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label
          htmlFor="password"
          style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#1e293b",
            marginBottom: "0.375rem",
          }}
        >
          Password
        </label>
        <div style={{ position: "relative" }}>
          <Lock size={16} style={{ position: "absolute", left: "0.875rem", top: "0.95rem", color: "#0d7777" }} />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ ...FIELD_STYLE, paddingLeft: "2.5rem" }}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8rem",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          <input type="checkbox" style={{ width: "1rem", height: "1rem" }} />
          Remember me
        </label>
      </div>

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            backgroundColor: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#b91c1c",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
          }}
        >
          <span style={{ color: "#dc2626", flexShrink: 0 }}>!</span>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{
          width: "100%",
          marginTop: "1.5rem",
          padding: "0.75rem",
          fontSize: "0.95rem",
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? <ArrowRight size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Sign In"}
      </button>
    </form>
  );
}