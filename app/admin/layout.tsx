"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Package,
  Users,
  Clock,
  FileText,
  Mail,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={18} /> },
  { href: "/admin/clients", label: "Clients", icon: <Users size={18} /> },
  { href: "/admin/enquiries", label: "Enquiries", icon: <Clock size={18} /> },
  { href: "/admin/quotes", label: "Quotes", icon: <FileText size={18} /> },
  { href: "/admin/letters", label: "Letters", icon: <Mail size={18} /> },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "260px" : "72px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease",
          position: "sticky",
          top: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#0d7777",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>V</span>
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1e293b" }}>
                Vaibhavi Admin
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Est. 1989 · Mumbai
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#0d7777",
                padding: "0.25rem",
                marginLeft: "auto",
              }}
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: "0.75rem 0", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => (sidebarOpen ? setSidebarOpen(false) : null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: sidebarOpen ? "0.75rem" : "1rem",
                  padding: sidebarOpen ? "0.75rem 1rem" : "0.875rem",
                  borderRadius: "8px",
                  color: active ? "#0d7777" : "#475569",
                  backgroundColor: active ? "#e6f4f4" : "transparent",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  borderLeft: sidebarOpen && active ? "3px solid #0d7777" : "none",
                  marginLeft: sidebarOpen && active ? "-3px" : 0,
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: sidebarOpen ? 24 : 28,
                    color: active ? "#0d7777" : "#94a3b8",
                  }}
                >
                  {item.icon}
                </div>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: sidebarOpen ? "0.75rem" : "1rem",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: sidebarOpen ? "0.75rem" : "1rem",
              background: "none",
              border: "none",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              width: "100%",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              padding: sidebarOpen ? "0.625rem 1rem" : "0.75rem",
              borderRadius: "8px",
            }}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && typeof window !== "undefined" && window.innerWidth < 768 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 60,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1e293b",
              display: sidebarOpen || typeof window === "undefined" || window.innerWidth >= 768 ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e293b" }}>
              Admin Panel
            </span>
          </div>
        </header>

        <main style={{ flex: 1, padding: "2rem 1.5rem", overflowX: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 767px) {
          aside { position: fixed; z-index: 50; height: 100vh; box-shadow: 4px 0 12px rgba(0,0,0,0.1); }
        }
      `}</style>
    </div>
  );
}
