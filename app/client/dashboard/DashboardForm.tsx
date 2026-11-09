"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

interface Order {
  id: string;
  quoteNumber: string;
  date: string;
  status: "pending" | "quoted" | "in-progress" | "completed" | "delivered";
  statusLabel: string;
  product: string;
  quantity: string;
  total: string;
  downloadable: boolean;
}

interface Certificate {
  id: string;
  name: string;
  date: string;
  type: string;
  url: string;
}

const ORDERS: Order[] = [
  {
    id: "ORD-2026-042",
    quoteNumber: "VE-2026-038",
    date: "2026-10-15",
    status: "completed",
    statusLabel: "Delivered",
    product: "PTFE Coating – Carbon Steel Pipes",
    quantity: "500 sq. m.",
    total: "₹2,45,000",
    downloadable: true,
  },
  {
    id: "ORD-2026-031",
    quoteNumber: "VE-2026-029",
    date: "2026-09-20",
    status: "delivered",
    statusLabel: "Delivered",
    product: "HALAR (ECTFE) Coating – Storage Tanks",
    quantity: "1,200 sq. m.",
    total: "₹8,90,000",
    downloadable: true,
  },
  {
    id: "ORD-2026-018",
    quoteNumber: "VE-2026-015",
    date: "2026-08-05",
    status: "delivered",
    statusLabel: "Delivered",
    product: "FBE Coating – Pipeline Section",
    quantity: "3,000 sq. m.",
    total: "₹15,50,000",
    downloadable: true,
  },
];

const CERTIFICATES: Certificate[] = [
  {
    id: "CERT-001",
    name: "ISO 9001:2015 Certificate",
    date: "2026-01-15",
    type: "Quality Management",
    url: "#",
  },
  {
    id: "CERT-002",
    name: "Whitford Quality Approved Coater",
    date: "2009-06-01",
    type: "Coating Certification",
    url: "#",
  },
  {
    id: "CERT-003",
    name: "FDA Compliance Statement",
    date: "2026-03-10",
    type: "Regulatory",
    url: "#",
  },
];

export default function DashboardForm() {
  const [activeTab, setActiveTab] = useState<"orders" | "certificates" | "reorder">("orders");

  const statusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "#16a34a";
      case "in-progress":
        return "#0a5f5f";
      case "quoted":
        return "#0d7777";
      default:
        return "#64748b";
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
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
              <Building2 size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                Client Dashboard
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                Vaibhavi Enterprises Client Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "2rem",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "1rem",
            }}
          >
            {[
              { key: "orders" as const, label: "Orders", icon: <Clock size={16} /> },
              { key: "certificates" as const, label: "Certificates", icon: <FileText size={16} /> },
              { key: "reorder" as const, label: "Reorder", icon: <ArrowRight size={16} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1rem",
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab.key ? "#0d7777" : "transparent"}`,
                  backgroundColor: "transparent",
                  color: activeTab === tab.key ? "#0d7777" : "#64748b",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                Order History
              </h3>
              <div
                style={{
                  overflowX: "auto",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Order ID
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Quote Number
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Date
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Product
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Quantity
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Total
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Status
                      </th>
                      <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {order.id}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>
                          {order.quoteNumber}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {order.date}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {order.product}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {order.quantity}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 700 }}>
                          {order.total}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.375rem 0.875rem",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              color: "#ffffff",
                              backgroundColor: statusColor(order.status),
                            }}
                          >
                            {order.statusLabel}
                          </span>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {order.downloadable ? (
                            <Link
                              href="#"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.85rem",
                                color: "#0d7777",
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              <Download size={14} /> Download
                            </Link>
                          ) : (
                            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                              Not available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                Certificates & Documents
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                  gap: "1.5rem",
                }}
              >
                {CERTIFICATES.map((cert) => (
                  <div
                    key={cert.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0d7777",
                        marginBottom: "1rem",
                      }}
                    >
                      <FileText size={20} />
                    </div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
                      {cert.name}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 1rem", flex: 1 }}>
                      {cert.type} • {cert.date}
                    </p>
                    <Link
                      href={cert.url}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        color: "#0d7777",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      <Download size={14} /> Download
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reorder Tab */}
          {activeTab === "reorder" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.5rem" }}>
                Reorder Previous Product
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "1.5rem" }}>
                Select a previous order to quickly reorder the same product
                and quantity.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                  gap: "1.5rem",
                }}
              >
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
                        {order.product}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                        {order.quantity} • {order.date}
                      </p>
                    </div>
                    <div style={{ marginTop: "auto" }}>
                      <Link
                        href="/enquiry"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          backgroundColor: "#0d7777",
                          color: "#ffffff",
                          padding: "0.6rem 1.25rem",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          textDecoration: "none",
                        }}
                      >
                        Reorder <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: "3rem 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "#0d7777",
              borderRadius: "8px",
              padding: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Phone size={20} style={{ color: "#ffffff" }} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  Technical Support
                </p>
                <p style={{ fontSize: "0.95rem", color: "#ffffff", margin: 0, fontWeight: 600 }}>
                  +91 98200 52056
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Mail size={20} style={{ color: "#ffffff" }} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  Accounts & Billing
                </p>
                <p style={{ fontSize: "0.95rem", color: "#ffffff", margin: 0, fontWeight: 600 }}>
                  response@vaibhavientp.com
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Building2 size={20} style={{ color: "#ffffff" }} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  Office Address
                </p>
                <p style={{ fontSize: "0.9rem", color: "#ffffff", margin: 0, maxWidth: "200px" }}>
                  N/3, Cama Industrial Estate, Goregaon (E), Mumbai – 400063
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>
    </div>
  );
}