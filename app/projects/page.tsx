import { Metadata } from "next";
import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Projects & Case Studies | Vaibhavi Enterprises",
  description:
    "Explore our successful coating and filtration installations across Maharashtra and India. Case studies for ONGC, L&T, Godrej, Mafatlal, Birla Group, and more.",
};

export default function ProjectsPage() {
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
          <div className="accent-line" />
          <h1
            className="section-heading"
            style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Projects &amp; Case Studies
          </h1>
          <p className="section-subheading" style={{ marginBottom: "3rem" }}>
            Successful coating and filtration installations across Maharashtra
            and India — delivering measurable results for our clients.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="project-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  height: "100%",
                }}
              >
                <div
                  className="project-card-image"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#f8fafc",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "rgba(13,119,119,0.9)",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      zIndex: 10,
                    }}
                  >
                    {project.category}
                  </span>
                  <div
                    className="project-card-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(13,119,119,0.9) 0%, rgba(13,119,119,0.4) 40%, transparent 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.5rem",
                      color: "#ffffff",
                    }}
                  >
                    <div style={{ zIndex: 10 }}>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#ffffff",
                          margin: "0 0 0.5rem",
                          lineHeight: 1.3,
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.9)",
                          lineHeight: 1.5,
                          margin: 0,
                          maxHeight: "4rem",
                          overflow: "hidden",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="project-card-overlay-content">
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
                        View Case Study <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: "0 0 0.5rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#64748b",
                        backgroundColor: "#f1f5f9",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      📍 {project.location}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#64748b",
                        backgroundColor: "#f1f5f9",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      📅 {project.year}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#64748b",
                        backgroundColor: "#f1f5f9",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      🤝 {project.client}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0d7777",
                    }}
                  >
                    View Case Study <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: "#0d7777", padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "0.75rem",
            }}
          >
            Planning a New Project?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              maxWidth: "480px",
              margin: "0 auto 1.75rem",
              lineHeight: 1.7,
            }}
          >
            Let our technical team recommend the right coating or filtration
            solution for your specific requirements.
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
            Start Enquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
