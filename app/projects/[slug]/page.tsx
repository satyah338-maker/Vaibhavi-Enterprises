import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found", description: "" };
  }

  return {
    title: `${project.name} | Vaibhavi Enterprises`,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} | Vaibhavi Enterprises`,
      description: project.shortDescription,
      type: "website",
      url: `https://www.vaibhavientp.com/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Vaibhavi Enterprises`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "#64748b",
              marginBottom: "1rem",
            }}
          >
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#cbd5e1" }}> / </span>
            <Link
              href="/projects"
              style={{ color: "#64748b", textDecoration: "none" }}
            >
              Projects
            </Link>
            <span style={{ color: "#cbd5e1" }}> / </span>
            <span style={{ color: "#1e293b", fontWeight: 600 }}>
              {project.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#e6f4f4",
                  color: "#0d7777",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                {project.category}
              </span>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  margin: "0 0 0.5rem",
                }}
              >
                {project.name}
              </h1>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.925rem",
                  margin: 0,
                  maxWidth: "500px",
                  lineHeight: 1.6,
                }}
              >
                {project.shortDescription}
              </p>
            </div>
            <Link href="/enquiry" className="btn-primary">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "flex-start",
            }}
            className="responsive-grid-1"
          >
            {/* Project Image */}
            <div className="w-full" style={{ minWidth: 0 }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "rgba(13,119,119,0.9)",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    zIndex: 10,
                  }}
                >
                  {project.category}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                >
                  📍 {project.location}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                >
                  📅 {project.year}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                >
                  🤝 {project.client}
                </span>
              </div>
            </div>

            {/* Project Details Content */}
            <div style={{ minWidth: 0 }}>
              {/* Description */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Project Overview
                </h2>
                <p
                  style={{
                    color: "#475569",
                    lineHeight: 1.85,
                    fontSize: "0.95rem",
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Challenges */}
              {project.challenges.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Key Challenges
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {project.challenges.map((c, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          color: "#475569",
                          fontSize: "0.9rem",
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#f1f5f9",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0d7777",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solutions */}
              {project.solutions.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Our Solution
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {project.solutions.map((s, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          color: "#475569",
                          fontSize: "0.9rem",
                        }}
                      >
                        <CheckCircle
                          size={16}
                          style={{
                            color: "#0d7777",
                            marginTop: "4px",
                            flexShrink: 0,
                          }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results */}
              {project.results.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Results Achieved
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {project.results.map((r, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          color: "#475569",
                          fontSize: "0.9rem",
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#f0fdf4",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#16a34a",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div
                style={{
                  backgroundColor: "#0d7777",
                  borderRadius: "8px",
                  padding: "1.75rem",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 0.75rem",
                  }}
                >
                  Have a Similar Project?
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.9)",
                    margin: "0 0 1rem",
                    lineHeight: 1.6,
                  }}
                >
                  Contact our technical team to discuss your coating and
                  filtration requirements.
                </p>
                <Link
                  href="/enquiry"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#ffffff",
                    color: "#0d7777",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  Start Enquiry <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: "2rem",
            }}
          >
            Related Projects
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
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
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#f8fafc",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
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
                        textTransform: "uppercase",
                        zIndex: 10,
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: "0 0 0.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#64748b",
                        lineHeight: 1.5,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {p.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="container" style={{ padding: "1.25rem 0" }}>
        <Link
          href="/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.85rem",
            color: "#64748b",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .responsive-grid-1 { grid-template-columns: 1fr !important; }
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
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.vaibhavientp.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: "https://www.vaibhavientp.com/projects",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: project.name,
                item: `https://www.vaibhavientp.com/projects/${project.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
