import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Award, Layers, FlaskConical, Phone } from "lucide-react";
import { products } from "@/data/products";
import { applications } from "@/data/applications";
import IndustryApplications from "@/components/IndustryApplications";

export const metadata: Metadata = {
  title: "Vaibhavi Enterprises | Fluoropolymer Coatings & Porous Plastic Filters Maharashtra",
  description:
    "Since 1989, Vaibhavi Enterprises is a leader in fluoropolymer (Viflon) surface coatings and Vaicon porous plastic filter media for pharmaceutical, chemical, and industrial applications. Serving Mumbai, Pune, Nashik, Thane, and all Maharashtra. PTFE, HALAR, ECTFE, FBE coatings and filtration solutions.",
  alternates: {
    canonical: "https://www.vaibhavientp.com/",
  },
  openGraph: {
    title: "Vaibhavi Enterprises | Fluoropolymer Coatings & Porous Plastic Filters Maharashtra",
    description:
      "Since 1989, Vaibhavi Enterprises is a leader in fluoropolymer (Viflon) surface coatings and Vaicon porous plastic filter media. Serving all Maharashtra.",
    type: "website",
    url: "https://www.vaibhavientp.com/",
    siteName: "Vaibhavi Enterprises",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhavi Enterprises | Fluoropolymer Coatings & Porous Plastic Filters Maharashtra",
    description:
      "Since 1989, Vaibhavi Enterprises is a leader in fluoropolymer (Viflon) surface coatings and Vaicon porous plastic filter media.",
  },
};

const STATS = [
  { value: "1989", label: "Year Established" },
  { value: "35+", label: "Years of Experience" },
  { value: "6+", label: "Coating & Filter Solutions" },
  { value: "500+", label: "Clients Served" },
];

const WHY_US = [
  {
    icon: <Award size={24} />,
    title: "Whitford Quality Approved",
    description:
      "First Indian company awarded Whitford's Quality Approved Coater certification for Xylan/PTFE coatings (2009–2011).",
  },
  {
    icon: <CheckCircle size={24} />,
    title: "FDA & ISO Compliant",
    description:
      "Our coatings and filter media meet international quality standards including FDA-compliant formulations and ISO 9001:2015 processes.",
  },
  {
    icon: <Layers size={24} />,
    title: "Custom Solutions",
    description:
      "We tailor coating thickness, grade, and color to your specification — from job-work coating to full product manufacturing.",
  },
  {
    icon: <FlaskConical size={24} />,
    title: "In-house Coating Shop",
    description:
      "Fully equipped in-house facility with controlled processes, enabling us to deliver consistent quality with fast turnaround.",
  },
];

const CLIENT_LOGOS = [
  { name: "ONGC", icon: "O" },
  { name: "Larsen &amp; Toubro", icon: "L" },
  { name: "Godrej &amp; Boyce", icon: "G" },
  { name: "Mafatlal", icon: "M" },
  { name: "Birla Group", icon: "B" },
  { name: "Tata", icon: "T" },
  { name: "Mahindra", icon: "M" },
  { name: "Reliance", icon: "R" },
];

const CLIENT_NAMES = [
  "ONGC",
  "Larsen & Toubro (L&T)",
  "Godrej & Boyce",
  "Mafatlal",
  "Birla Group",
  "Tata",
  "Mahindra",
  "Reliance",
  "Leading pharma companies",
  "Chemical processing plants",
  "Food & beverage units",
  "Automotive manufacturers",
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative w-full bg-slate-800 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(13,119,119,0.85) 0%, rgba(13,119,119,0.55) 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div
          className="container relative z-10"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "5rem 1rem",
            minHeight: "60vh",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.5rem 1.25rem",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#5eead4",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              borderRadius: "4px",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Est. 1989 · Mumbai, India
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: "0 0 1.5rem",
              maxWidth: "800px",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Protecting Surfaces. Enabling Industry.
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.8,
              margin: "0 0 2rem",
              maxWidth: "600px",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            India&apos;s trusted source for <strong style={{ color: "#5eead4" }}>Viflon fluoropolymer coatings</strong> and{" "}
            <strong style={{ color: "#5eead4" }}>Vaicon porous plastic filters</strong> — engineered for the harshest industrial environments.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/enquiry" className="btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.1)", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0d7777" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 0,
            borderLeft: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "1.75rem 1.25rem",
                borderRight: "1px solid rgba(255,255,255,0.15)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "0.375rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Company Intro ───────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3.5rem",
              alignItems: "center",
            }}
            className="responsive-grid-1"
          >
            <div style={{ minWidth: 0 }}>
              <div className="accent-line" />
              <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
                Trusted by Industry Since 1989
              </h2>
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1rem" }}>
                <strong>M/s. Vaibhavi Enterprises</strong> is a rapidly expanding company committed to maintaining the highest standards of quality and delivering exceptional customer service. We are acknowledged as a leader in development and advancement of surface enhancement.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1rem" }}>
                Under our brand <strong style={{ color: "#0d7777" }}>Viflon</strong>, we manufacture and apply fluoropolymer coatings (PTFE, ECTFE/Halar, FBE, PVDF, FEP, PFA) for metal surfaces and other substrates — providing unmatched corrosion resistance, non-stick properties, and chemical inertness.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                We are also the manufacturer of <strong style={{ color: "#0d7777" }}>Vaicon</strong> porous plastic filter media — sintered UHMWPE/PE filters specifically designed for pharmaceutical, chemical, and pneumatic applications.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/about" className="btn-primary">
                  Our Story <ArrowRight size={16} />
                </Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#0d7777", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                  <Phone size={15} /> Contact Us
                </Link>
              </div>
            </div>
            <div style={{ minWidth: 0, borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <Image
                src="/image.svg"
                alt="Vaibhavi Enterprises facility"
                width={600}
                height={400}
                style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Products & Services (by Application) ─────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Our Products &amp; Services</h2>
          <p className="section-subheading">
            High-performance industrial coatings and filtration solutions
            organized by application — see which products serve each industry.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {applications.map((app) => {
              const appProducts = app.productSlugs
                .map((s) => products.find((p) => p.slug === s))
                .filter(Boolean);
              const featuredImage = appProducts[0]?.images?.[0];
              return (
                <Link
                  key={app.slug}
                  href={`/applications/${app.slug}`}
                  className="app-service-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    textDecoration: "none",
                    transition: "all 0.35s ease",
                    height: "100%",
                  }}
                >
                  {/* Image container — image only by default */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    {featuredImage ? (
                      <Image
                        className="app-service-image"
                        src={featuredImage}
                        alt={app.name}
                        fill
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.45s ease",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#e2e8f0",
                          color: "#94a3b8",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      >
                        {app.name}
                      </div>
                    )}
                    {/* Hover overlay — basic info appears on hover */}
                    <div
                      className="app-service-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(13,119,119,0.95) 0%, rgba(13,119,119,0.65) 50%, transparent 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        opacity: 0,
                        transition: "opacity 0.35s ease",
                        padding: "1.5rem",
                        textAlign: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "#ffffff",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {appProducts.length} Products
                      </span>
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          margin: "0 0 0.5rem",
                          lineHeight: 1.3,
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {app.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.95)",
                          lineHeight: 1.5,
                          margin: 0,
                          maxWidth: "260px",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {app.shortDescription}
                      </p>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          backgroundColor: "#ffffff",
                          color: "#0d7777",
                          padding: "0.5rem 1rem",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          textDecoration: "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        View Solutions <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              href="/products"
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .app-service-card:hover {
          border-color: #0d7777 !important;
          box-shadow: 0 8px 24px rgba(13, 119, 119, 0.12) !important;
          transform: translateY(-4px) !important;
        }
        .app-service-card:hover .app-service-image {
          transform: scale(1.05) !important;
        }
        .app-service-card:hover .app-service-overlay {
          opacity: 1 !important;
        }
        .client-logo-card:hover {
          border-color: #0d7777 !important;
          box-shadow: 0 6px 16px rgba(13, 119, 119, 0.1) !important;
          transform: translateY(-2px) !important;
          backgroundColor: #f0fdfa !important;
        }
      `}</style>

      {/* ── Industries Served ───────────────────────────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Industries We Serve</h2>
          <p className="section-subheading">
            Our coatings and filters are trusted across a broad spectrum of demanding industrial sectors.
          </p>
          <IndustryApplications />
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Why Choose Vaibhavi Enterprises?</h2>
          <p className="section-subheading">
            Decades of expertise, certified quality, and a commitment to solving your toughest surface challenges.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {WHY_US.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "#e6f4f4",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0d7777",
                    marginBottom: "1rem",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials ─────────────────────────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-subheading">
            Hear from our long-standing partners across Maharashtra&apos;s
            industrial sector.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                name: "R. Sharma",
                title: "Procurement Manager",
                company: "ONGC, Mumbai",
                companySlug: "ongc",
                rating: 5,
                text:
                  "Vaibhavi Enterprises has been our trusted coating partner for over 5 years. Their FBE coating on our pipeline infrastructure has performed flawlessly in offshore conditions.",
              },
              {
                name: "S. Desai",
                title: "Plant Head",
                company: "L&T, Pune",
                companySlug: "lnt",
                rating: 5,
                text:
                  "The HALAR coating on our chemical storage tanks has exceeded expectations. Zero permeation after 24 months of service.",
              },
              {
                name: "M. Iyer",
                title: "Quality Manager",
                company: "Godrej & Boyce, Mumbai",
                companySlug: "godrej",
                rating: 5,
                text:
                  "Whitford Quality Approved certification gives us confidence. PTFE coating on our molds has reduced release agent usage by 95%.",
              },
              {
                name: "A. Patel",
                title: "Operations Director",
                company: "Birla Group, Nagpur",
                companySlug: "birla",
                rating: 5,
                text:
                  "Professional team, timely delivery, and coatings that last. Vaibhavi is our go-to for corrosion protection.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= testimonial.rating ? "#0d7777" : "#cbd5e1",
                        fontSize: "1.1rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#475569",
                    lineHeight: 1.7,
                    margin: "0 0 1.25rem",
                    fontStyle: "italic",
                  }}
                >
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
                    {testimonial.name}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Clients ─────────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Trusted by Industry Leaders</h2>
          <p className="section-subheading">
            Proud to serve leading industrial organisations across Maharashtra and India with quality coatings and filtration solutions.
          </p>

          {/* Client Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0d7777", lineHeight: 1 }}>
                {"500+"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }}>
                Clients Served
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0d7777", lineHeight: 1 }}>
                {"10+"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }}>
                Industries
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0d7777", lineHeight: 1 }}>
                {"35+"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }}>
                Years Experience
              </div>
            </div>
          </div>

          {/* Client Logos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1.5rem",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="client-logo-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.25rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e6f4f4",
                    color: "#0d7777",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    marginBottom: "0.6rem",
                    letterSpacing: "0.05em",
                    transition: "all 0.25s ease",
                  }}
                >
                  {client.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#475569",
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Client Names */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {CLIENT_NAMES.map((name) => (
              <span
                key={name}
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  padding: "0.5rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  backgroundColor: "#f8fafc",
                  fontWeight: 500,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0d7777", padding: "3.5rem 0" }}>
        <div
          className="container"
          style={{ textAlign: "center" }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Ready to Protect Your Components?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            Talk to our coating experts. We&apos;ll recommend the right solution for your substrate, environment, and performance requirements.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
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
              Send an Enquiry <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+919820052056"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "transparent",
                color: "#ffffff",
                padding: "0.7rem 1.5rem",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            >
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .responsive-grid-1 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Vaibhavi Enterprises",
            url: "https://www.vaibhavientp.com",
            logo: "https://www.vaibhavientp.com/logo.png",
            description:
              "Since 1989, Vaibhavi Enterprises has been a leader in fluoropolymer (Viflon) surface coatings and Vaicon porous plastic filter media for pharmaceutical, chemical, and industrial applications. Mumbai, India.",
            foundingDate: "1989",
            founder: {
              "@type": "Person",
              name: "Mr. Hitesh B. Bhatt",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "N/3, Cama Industrial Estate, Opp. Jaipan Industries, Walbhat Road",
              addressLocality: "Goregaon (East)",
              addressRegion: "Mumbai",
              addressCountry: "IN",
              postalCode: "400063",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-98200-52056",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              {
                "@type": "ContactPoint",
                telephone: "+91-98200-52057",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
            ],
            sameAs: [
              "https://www.google.com/maps/place/VAIBHAVI+ENTERPRISES",
            ],
            email: "response@vaibhavientp.com",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.vaibhavientp.com/#localbusiness",
            name: "Vaibhavi Enterprises",
            image: "https://www.vaibhavientp.com/logo.png",
            url: "https://www.vaibhavientp.com",
            telephone: "+919820052056",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "N/3, Cama Industrial Estate, Opp. Jaipan Industries, Walbhat Road",
              addressLocality: "Goregaon (East)",
              addressRegion: "Mumbai",
              postalCode: "400063",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 19.1587,
              longitude: 72.8544,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            servesArea: {
              "@type": "Place",
              name: "Maharashtra, India",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Products and Services",
              itemOffered: [
                {
                  "@type": "Service",
                  name: "Fluoropolymer Coatings (PTFE, HALAR, ECTFE, PVDF, FEP, PFA)",
                },
                {
                  "@type": "Service",
                  name: "Fusion Bonded Epoxy (FBE) Coating",
                },
                {
                  "@type": "Service",
                  name: "Porous Plastic Filter Media (Vaicon)",
                },
                {
                  "@type": "Service",
                  name: "Industrial Coating Services",
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
