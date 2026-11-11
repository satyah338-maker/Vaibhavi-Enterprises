import { readCollection, type DbItem } from "@/lib/db";
import Link from "next/link";
import {
  Package,
  Users,
  Clock,
  FileText,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

type EnquiryRow = DbItem & {
  name?: string;
  company?: string;
  product?: string;
  quantity?: string;
  status?: string;
  total?: number;
};

async function getStats() {
  const [products, clients, enquiries, quotes] = await Promise.all([
    readCollection<DbItem>("products"),
    readCollection<DbItem>("clients"),
    readCollection<EnquiryRow>("enquiries"),
    readCollection<DbItem>("quotes"),
  ]);
  const pendingEnquiries = enquiries.filter(
    (e) => e.status === "new" || !e.status,
  ).length;
  return { products, clients, enquiries, quotes, pendingEnquiries };
}

const statCards = [
  {
    label: "Total Products",
    value: "0",
    icon: <Package size={22} />,
    color: "#0d7777",
    href: "/admin/products",
  },
  {
    label: "Total Clients",
    value: "0",
    icon: <Users size={22} />,
    color: "#0d7777",
    href: "/admin/clients",
  },
  {
    label: "Total Enquiries",
    value: "0",
    icon: <Clock size={22} />,
    color: "#0d7777",
    href: "/admin/enquiries",
  },
  {
    label: "Total Quotes",
    value: "0",
    icon: <FileText size={22} />,
    color: "#0d7777",
    href: "/admin/quotes",
  },
];

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
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
            <DashboardIcon />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
              Manage your website content and business workflow
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {statCards.map((card, i) => {
            const value =
              i === 0
                ? stats.products.length
                : i === 1
                ? stats.clients.length
                : i === 2
                ? stats.enquiries.length
                : stats.quotes.length;
            return (
              <Link
                key={card.label}
                href={card.href}
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
                      {card.label}
                    </p>
                    <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                      {value}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      backgroundColor: `${card.color}15`,
                      borderRadius: "10px",
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "1.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 1.25rem" }}>
            Quick Actions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "1rem",
            }}
          >
            <Link
              href="/admin/products/new"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#0d7777",
                color: "#ffffff",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              <Package size={18} /> Add New Product
            </Link>
            <Link
              href="/admin/clients/new"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#0d7777",
                color: "#ffffff",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              <Users size={18} /> Add New Client
            </Link>
            <Link
              href="/admin/enquiries"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#ffffff",
                color: "#0d7777",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "1px solid #0d7777",
              }}
            >
              <Clock size={18} /> View Enquiries
            </Link>
            <Link
              href="/admin/letters"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#ffffff",
                color: "#0d7777",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "1px solid #0d7777",
              }}
            >
              <FileText size={18} /> Generate Letter
            </Link>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "1.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
              Recent Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#0d7777",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {stats.enquiries.length === 0 ? (
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No enquiries yet. Submissions from the website enquiry form will appear here.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Name
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Company
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Product
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Status
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.enquiries
                    .slice()
                    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
                    .slice(0, 5)
                    .map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {enq.name}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {enq.company}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {enq.product || "—"}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              color: "#ffffff",
                              backgroundColor: "#0d7777",
                            }}
                          >
                            {enq.status || "new"}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
