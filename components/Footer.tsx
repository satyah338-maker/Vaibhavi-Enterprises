import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { products } from "@/data/products";

export default function Footer() {
  const coatings = products.filter((p) => p.category === "Coatings");
  const filters = products.filter((p) => p.category === "Filters");

  return (
    <footer
      style={{
        backgroundColor: "#1e293b",
        color: "#cbd5e1",
        borderTop: "1px solid #334155",
      }}
    >
      {/* Main Footer */}
      <div
        className="container"
        style={{
          paddingTop: "3rem",
          paddingBottom: "2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* Company Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            {/* 
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#0d7777",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>V</span>
            </div>
            */}
            <Image 
              src="/logo.png" 
              alt="Vaibhavi Enterprises Logo" 
              width={36} 
              height={36} 
              style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9" }}>Vaibhavi Enterprises</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Est. 1989</div>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#94a3b8", marginBottom: "1.25rem" }}>
            Pioneer in fluoropolymer surface coatings and porous plastic filter media. Serving pharmaceutical, chemical, and industrial clients across India and globally since 1989.
          </p>
          <div style={{ fontSize: "0.8rem", color: "#14b8a6", fontWeight: 500 }}>
            Whitford Quality Approved Coater
          </div>
        </div>

        {/* Coatings */}
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#f1f5f9",
              marginBottom: "1rem",
            }}
          >
            Coatings
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {coatings.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="hover-text-primary"
                  style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none" }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Filters */}
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#f1f5f9",
              marginBottom: "1rem",
            }}
          >
            Filter Media
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {filters.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="hover-text-primary"
                  style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none" }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#f1f5f9",
              marginBottom: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[{ label: "About Us", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Enquiry", href: "/enquiry" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover-text-primary"
                  style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#f1f5f9",
              marginBottom: "1rem",
            }}
          >
            Contact Us
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <MapPin size={15} style={{ color: "#0d7777", marginTop: "2px", flexShrink: 0 }} />
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                N/3, Cama I.E., Opp. Jaipan Ind.,<br />
                Walbhat Rd., Goregaon (E),<br />
                Mumbai – 400063, India
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
              <Phone size={15} style={{ color: "#0d7777", marginTop: "2px", flexShrink: 0 }} />
              <div style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                <a href="tel:+919820052056" style={{ color: "inherit", textDecoration: "none", display: "block" }}>+91 98200 52056</a>
                <a href="tel:+919820052057" style={{ color: "inherit", textDecoration: "none", display: "block" }}>+91 98200 52057</a>
                <a href="tel:02249789807" style={{ color: "inherit", textDecoration: "none", display: "block" }}>022-49789807</a>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
              <Mail size={15} style={{ color: "#0d7777", marginTop: "2px", flexShrink: 0 }} />
              <div style={{ fontSize: "0.82rem" }}>
                <a href="mailto:response@vaibhavientp.com" style={{ color: "#94a3b8", textDecoration: "none", display: "block" }}>response@vaibhavientp.com</a>
                <a href="mailto:vaibhavient@gmail.com" style={{ color: "#94a3b8", textDecoration: "none", display: "block" }}>vaibhavient@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #334155",
          padding: "1.25rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: "#64748b",
          }}
        >
          <span>© {new Date().getFullYear()} Vaibhavi Enterprises. All rights reserved.</span>
          <a
            href="https://www.google.com/maps/place/VAIBHAVI+ENTERPRISES"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "4px", color: "#64748b", textDecoration: "none" }}
          >
            View on Maps <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
