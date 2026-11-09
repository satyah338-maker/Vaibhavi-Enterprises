import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found", description: "" };
  }

  return {
    title: `${post.title} | Vaibhavi Enterprises`,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `https://www.vaibhavientp.com/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderContent = (html: string) => {
    return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: "0.95rem",
        color: "#475569",
        lineHeight: 1.8,
      }}
    />
    );
  };

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
              href="/blog"
              style={{ color: "#64748b", textDecoration: "none" }}
            >
              Blog
            </Link>
            <span style={{ color: "#cbd5e1" }}> / </span>
            <span style={{ color: "#1e293b", fontWeight: 600 }}>
              {post.category}
            </span>
          </div>
          <div className="accent-line" />
          <h1
            className="section-heading"
            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
          >
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "700px",
              margin: 0,
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "3rem",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#e2e8f0",
                  marginBottom: "1.5rem",
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
              <div className="blog-content">{renderContent(post.content)}</div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "#1e293b",
                    margin: "0 0 1rem",
                  }}
                >
                  Related Articles
                </h3>
                {blogPosts
                  .filter((p) => p.category === post.category && p.slug !== slug)
                  .slice(0, 3)
                  .map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "#1e293b",
                        marginBottom: "0.75rem",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {related.title}
                    </Link>
                  ))}
              </div>

              <div
                style={{
                  backgroundColor: "#0d7777",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "0 0 1rem",
                  }}
                >
                  Need a Coating Solution?
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.6,
                    margin: "0 0 1rem",
                  }}
                >
                  Talk to our technical team about PTFE, HALAR, FBE, or Vaicon
                  filter solutions for your Maharashtra project.
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
                  Request a Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
          section > div > div { grid-template-columns: 1fr !important; }
        }
        .blog-content h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          line-height: 1.3;
        }
        .blog-content ul {
          list-style: disc;
          color: #64748b;
          line-height: 1.7;
          margin: 0 0 1rem 1.5rem;
          padding-left: 0;
        }
        .blog-content p {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.8;
          margin: 0 0 1rem;
        }
      `}</style>
    </div>
  );
}