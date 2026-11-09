import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Vaibhavi Enterprises",
  description:
    "Insights on fluoropolymer coatings, porous plastic filters, and industrial surface protection from Vaibhavi Enterprises, Mumbai. Serving Maharashtra's chemical, pharma, oil & gas, and power sectors.",
};

const CATEGORY_ORDER = [
  "Chemical Processing",
  "Oil & Gas",
  "Pharmaceutical",
  "Power Generation",
  "Certifications",
];

export default function BlogPage() {
  const grouped = CATEGORY_ORDER.flatMap((cat) =>
    blogPosts.filter((p) => p.category === cat)
  );
  const uncategorized = blogPosts.filter(
    (p) => !CATEGORY_ORDER.includes(p.category)
  );
  const allPosts = [...grouped, ...uncategorized];

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
            Insights &amp; Technical Articles
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Expert guidance on fluoropolymer coatings, porous plastic filters,
            and industrial surface protection &mdash; tailored for Maharashtra&apos;s
            chemical, pharma, oil &amp; gas, and power sectors.
          </p>
          {/* Maharashtra&apos;s - escaped apostrophe */}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "2rem",
            }}
          >
            {allPosts.map((post) => (
              <article
                key={post.slug}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    backgroundColor: "#e2e8f0",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "rgba(13,119,119,0.9)",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      zIndex: 10,
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#64748b" }}>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#1e293b",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      lineHeight: 1.6,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0d7777",
                      textDecoration: "none",
                    }}
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
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