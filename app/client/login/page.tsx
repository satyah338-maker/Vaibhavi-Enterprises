import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Client Portal Login | Vaibhavi Enterprises",
  description:
    "Login to the Vaibhavi Enterprises client portal to track quote status, view invoices, and reorder coatings and filters.",
};

export default function ClientLoginPage() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container" style={{ maxWidth: "480px", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "2.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#0d7777",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>V</span>
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                Vaibhavi Enterprises
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                Client Portal
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
            Welcome Back
          </h3>

          <LoginForm />

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 1rem" }}>
              Don&apos;t have portal access? Contact your account manager or email{" "}
              <a href="mailto:response@vaibhavientp.com" style={{ color: "#0d7777", fontWeight: 600 }}>
                response@vaibhavientp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}