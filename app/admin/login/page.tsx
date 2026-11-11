"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runSubmit(e);
  };

  async function runSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid username or password");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch {
      setError("Unable to connect to the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "420px", width: "100%", padding: "1.5rem" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "2.5rem 2rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#0d7777",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>V</span>
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                Vaibhavi Enterprises
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                Admin Panel
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
            Sign In
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.75rem" }}>
            Manage products, clients, enquiries, and business letters.
          </p>

          {error && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "#64748b",
                }}
              >
                <Mail size={18} />
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                autoComplete="username"
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "#64748b",
                }}
              >
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#0d7777",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "0.8rem 1rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? "Signing in..." : <><ArrowRight size={16} /> Sign In</>}
            </button>
          </form>

          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>
            Default credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
            <Link href="/" style={{ color: "#0d7777", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
