import { CheckCircle, Award, Users, Target, Lightbulb } from "lucide-react";

const ACHIEVEMENTS = [
  "ISO 9001:2015 certified manufacturing processes",
  "First Indian Whitford Quality Approved Coater for Xylan/PTFE coatings (2009–2011)",
  "Registered vendor for ONGC, L&T, Godrej & Boyce, and other major industrial companies",
  "Dedicated in-house R&D and quality testing facilities",
  "Serving domestic and international customers across 10+ industries",
  "Pioneer in Fusion Bonded Epoxy (FBE) coating technology in India since 1994",
];

const PRODUCTS = [
  {
    name: "Viflon Fluoropolymer Coatings",
    tag: "PTFE · HALAR · PVDF · FEP · PFA",
    description:
      "Our flagship coating brand covers the full spectrum of fluoropolymer technologies — PTFE (Xylan), ECTFE (Halar), PVDF (Kynar), FEP, and PFA. These coatings deliver superior non-stick properties, chemical resistance up to 260°C, and low friction coefficients for demanding applications.",
    industries: ["Automotive", "Chemical", "Food Processing", "Pharmaceutical"],
  },
  {
    name: "Vaicon Porous Plastic Filters",
    tag: "Sintered UHMWPE / PE",
    description:
      "Engineered from sintered ultra-high molecular weight polyethylene, Vaicon filter media offer consistent pore distribution, chemical inertness, and high filtration efficiency. Available as sheets, tubes, and custom-shaped products for pharmaceutical, chemical, and pneumatic applications.",
    industries: ["Pharmaceutical", "Chemical", "Pneumatics", "Laboratory"],
  },
  {
    name: "Aqua Safe Water Purifiers",
    tag: "Domestic · Industrial",
    description:
      "Combining advanced silver ion and UV purification technologies, our AquaSafe purifiers deliver safe drinking water without electricity or chemicals — designed for both domestic and industrial deployment.",
    industries: ["Domestic", "Industrial", "Healthcare"],
  },
  {
    name: "Apollo Yarn Oiling Device",
    tag: "Textile Industry",
    description:
      "Precision-engineered Apollo Head Container for automated yarn oiling — trusted by leading textile manufacturers such as Mafatlal and Birla to reduce yarn breakage, improve quality, and lower downtime.",
    industries: ["Textile", "Manufacturing"],
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <p style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Company
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.75rem" }}>
            About Vaibhavi Enterprises
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            A pioneer in fluoropolymer coatings and porous plastic filter media, serving Indian and global industry since 1989.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section style={{ padding: "4rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "flex-start" }} className="responsive-grid-1">
            <div>
              <div className="accent-line" />
              <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>Our Story</h2>
              <p style={{ color: "#475569", lineHeight: 1.85, marginBottom: "1rem" }}>
                Founded in <strong>1989</strong> by <strong>Mr. Hitesh B. Bhatt</strong>, Vaibhavi Enterprises began with a clear vision: to provide Indian industry with world-class surface protection and filtration technologies that were previously only available as imports.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.85, marginBottom: "1rem" }}>
                From our facility at Goregaon (East), Mumbai, we have grown into a multi-product company with an in-house coating shop, a dedicated filter media manufacturing unit, and a team of experienced engineers who understand the unique demands of each client&apos;s process environment.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.85 }}>
                We are proud to have been recognised as the <strong>first Indian company</strong> to receive the Whitford &ldquo;Quality Approved Coater&rdquo; certification for Xylan/PTFE coatings. Today, we serve hundreds of customers across pharmaceutical, chemical, oil &amp; gas, food processing, automotive, and textile industries — both within India and internationally.
              </p>
            </div>
            <div>
              <div className="accent-line" />
              <h2 className="section-heading" style={{ marginBottom: "1.25rem" }}>Our Founder</h2>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "#0d7777",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Users size={24} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "1.05rem" }}>Mr. Hitesh B. Bhatt</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Founder & Managing Director</div>
                  </div>
                </div>
                <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.9rem", margin: 0 }}>
                  A visionary entrepreneur with over 35 years in industrial coatings and materials, Mr. Bhatt&apos;s emphasis on <em>quality, ethics, and customer trust</em> has been the bedrock of Vaibhavi Enterprises&apos; success. He pioneered the introduction of several import-substitute technologies to the Indian market — including the AquaSafe purifier and the Apollo Yarn Oiling Device, now trusted by top textile brands like Mafatlal and Birla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "stretch" }} className="responsive-grid-1">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "40px", height: "40px", backgroundColor: "#e6f4f4", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d7777" }}>
                  <Target size={20} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Our Mission</h3>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.8, margin: 0 }}>
                To be India&apos;s most trusted provider of surface coatings and filtration media by maintaining top-quality standards, adopting ethical practices, offering customised solutions, and providing unmatched customer support from enquiry to delivery.
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "40px", height: "40px", backgroundColor: "#e6f4f4", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d7777" }}>
                  <Lightbulb size={20} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Our Vision</h3>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.8, margin: 0 }}>
                To continuously innovate in coating technologies and filtration solutions, building lasting relationships with global and domestic clients while contributing to Make-in-India through import substitution and creating a dynamic, growth-oriented workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Innovations */}
      <section style={{ padding: "4rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Products &amp; Innovations</h2>
          <p className="section-subheading">Smart, sustainable, and industry-compliant solutions developed over 35 years.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#e6f4f4",
                    color: "#0d7777",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.tag}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.625rem" }}>{p.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1rem" }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {p.industries.map((ind) => (
                    <span
                      key={ind}
                      style={{
                        fontSize: "0.72rem",
                        color: "#475569",
                        border: "1px solid #e2e8f0",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        fontWeight: 500,
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional services row */}
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { title: "Customised Coating Services", desc: "Job-coating with FEP, PFA, ETFE, and Xylan blends to your specifications" },
              { title: "Component Protection", desc: "Anti-corrosion and anti-friction coatings for fasteners, valves, and assemblies" },
              { title: "Import Substitution", desc: "Cost-effective replacements for imported coated or filtered components" },
            ].map((s) => (
              <div key={s.title} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0d7777", marginBottom: "0.375rem" }}>{s.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Quality &amp; Achievements</h2>
          <p className="section-subheading">Quality is embedded in our culture — from raw material selection to final delivery.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.875rem" }}>
            {ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                }}
              >
                <CheckCircle size={18} style={{ color: "#0d7777", marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6 }}>{achievement}</span>
              </div>
            ))}
          </div>

          {/* Clients */}
          <div style={{ marginTop: "2.5rem", padding: "1.75rem 2rem", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Award size={20} style={{ color: "#0d7777" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Trusted By</h3>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.8, margin: 0 }}>
              Our products have served prestigious clients including <strong style={{ color: "#1e293b" }}>ONGC</strong>, <strong style={{ color: "#1e293b" }}>Larsen &amp; Toubro (L&amp;T)</strong>, <strong style={{ color: "#1e293b" }}>Godrej &amp; Boyce</strong>, <strong style={{ color: "#1e293b" }}>Mafatlal</strong>, <strong style={{ color: "#1e293b" }}>Birla Group</strong>, and many more leading industrial organisations across India and overseas.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .responsive-grid-1 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
