"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);


  const isActive = (href: string) => pathname === href;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", height: "64px", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
              flexShrink: 0,
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
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b", lineHeight: 1.2 }}>
              Vaibhavi Enterprises
            </div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: 1 }}>
              Est. 1989 · Mumbai, India
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.4rem 0.875rem",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "0.9rem",
                textDecoration: "none",
                color: isActive(link.href) ? "#0d7777" : "#475569",
                backgroundColor: isActive(link.href) ? "#e6f4f4" : "transparent",
                transition: "all 0.15s ease",
              }}
            >
              {link.label}
            </Link>
          ))}



          <Link href="/enquiry" className="btn-primary" style={{ marginLeft: "0.5rem", padding: "0.45rem 1.1rem", fontSize: "0.875rem" }}>
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#1e293b", padding: "0.25rem" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "1rem 1.5rem 1.5rem",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "0.625rem 0.875rem",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                color: isActive(link.href) ? "#0d7777" : "#1e293b",
                backgroundColor: isActive(link.href) ? "#e6f4f4" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/enquiry" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: "0.75rem", justifyContent: "center" }}>
            Get a Quote
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
