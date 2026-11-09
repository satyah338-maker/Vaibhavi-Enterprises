import { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications & Compliance | Vaibhavi Enterprises",
  description:
    "ISO 9001:2015 certified, Whitford Quality Approved Coater (Xylan/PTFE, 2009–2011), FDA-compliant coatings. Registered vendor for ONGC, L&T, Godrej & Boyce. Mumbai, India.",
};

const CERTIFICATIONS = [
  {
    icon: <ShieldCheck size={32} />,
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    description:
      "Our manufacturing processes follow ISO 9001:2015 quality management standards, ensuring consistent coating quality, traceability, and continuous improvement across every project.",
    badge: "Certified Since 2015",
  },
  {
    icon: <Award size={32} />,
    title: "Whitford Quality Approved Coater",
    subtitle: "Xylan / PTFE Coatings",
    description:
      "First Indian company awarded Whitford&apos;s &quot;Quality Approved Coater&quot; certification for Xylan/PTFE coatings (2009–2011). Rigorous third-party audit of our coating processes, equipment, and quality systems.",
    badge: "First Indian Coater",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "FDA Compliant",
    subtitle: "Coatings & Filter Media",
    description:
      "Our PTFE, HALAR, and porous plastic filter media are available in FDA-compliant formulations for food processing, pharmaceutical, and medical device applications.",
    badge: "FDA Compliant",
  },
  {
    icon: <Building2 size={32} />,
    title: "Registered Vendor",
    subtitle: "ONGC · L&T · Godrej & Boyce",
    description:
      "Approved vendor for ONGC, Larsen & Toubro, Godrej & Boyce, Mafatlal, Birla Group, and other major Indian industrial companies across oil & gas, chemical, and manufacturing sectors.",
    badge: "Empanelled Vendor",
  },
];

const ACHIEVEMENTS = [
  "Pioneer in Fusion Bonded Epoxy (FBE) coating technology in India since 1994",
  "Serving domestic and international customers across 10+ industries",
  "Dedicated in-house R&D and quality testing facilities",
  "Surface preparation to SSPC-SP10 standard with holiday testing",
  "In-house coating shop with controlled processes and fast turnaround",
  "Custom coating thickness, grade, and color to client specification",
];

export default function CertificationsPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <div className="accent-line" />
          <h1
            className="section-heading"
            style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
          >
            Certifications &amp; Compliance
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Quality certifications, regulatory compliance, and vendor
            approvals that back every coating and filter we deliver.
          </p>
        </div>
      </div>

      {/* Certifications Grid */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "2rem",
            }}
          >
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#e6f4f4",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0d7777",
                    marginBottom: "1rem",
                  }}
                >
                  {cert.icon}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#e6f4f4",
                    color: "#0d7777",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {cert.badge}
                </span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#1e293b",
                    margin: "0 0 0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {cert.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    lineHeight: 1.6,
                    margin: "0 0 1rem",
                    flex: 1,
                  }}
                >
                  {cert.description}
                </p>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#0d7777",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {cert.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading" style={{ marginBottom: "2rem" }}>
            Key Achievements
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#e6f4f4",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0d7777",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#475569",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", backgroundColor: "#0d7777" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            Need Certified Coating Solutions?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 auto 1.75rem",
              lineHeight: 1.7,
            }}
          >
            Work with an ISO 9001:2015 certified, Whitford Quality Approved
            coater serving Maharashtra&apos;s industrial sector since 1989.
          </p>
          <Link
            href="/enquiry"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#ffffff",
              color: "#0d7777",
              padding: "0.7rem 1.5rem",
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
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