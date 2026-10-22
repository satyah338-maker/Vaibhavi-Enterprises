import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1rem" }}>
            Page Not Found
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
            The page you are looking for does not exist. Return to the homepage or explore our products.
          </p>
        </div>
      </div>

      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#0d7777",
              color: "#ffffff",
              padding: "0.7rem 1.5rem",
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
