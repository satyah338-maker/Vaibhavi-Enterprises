import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { applications, getApplicationBySlug } from "@/data/applications";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return applications.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApplicationBySlug(slug);

  if (!app) {
    return { title: "Application Not Found", description: "" };
  }

  return {
    title: app.metaTitle,
    description: app.metaDescription,
    alternates: {
      canonical: `/applications/${slug}`,
    },
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      type: "website",
      url: `https://www.vaibhavientp.com/applications/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: app.metaTitle,
      description: app.metaDescription,
    },
  };
}

export default async function ApplicationPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApplicationBySlug(slug);

  if (!app) {
    notFound();
  }

  const appProducts = app.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

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
            <span style={{ color: "#1e293b", fontWeight: 600 }}>
              Applications
            </span>
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: "0 0 0.75rem",
            }}
          >
            {app.name}
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "600px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {app.description}
          </p>
        </div>
      </div>

      {/* Industries Served */}
      {app.industries.length > 0 && (
        <section style={{ padding: "2rem 0", backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  fontWeight: 600,
                  marginRight: "0.5rem",
                }}
              >
                Industries Served:
              </span>
              {app.industries.map((ind) => (
                <span
                  key={ind}
                  style={{
                    fontSize: "0.78rem",
                    color: "#0d7777",
                    backgroundColor: "#e6f4f4",
                    borderRadius: "4px",
                    padding: "3px 10px",
                    fontWeight: 500,
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products in this Application */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="accent-line" />
          <h2
            className="section-heading"
            style={{ marginBottom: "1rem" }}
          >
            Products for {app.name}
          </h2>
          <p
            className="section-subheading"
            style={{ marginBottom: "3rem" }}
          >
            Explore our complete range of coating and filtration solutions
            designed specifically for {app.name.toLowerCase()}.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {appProducts.map((product) => (
              <Link
                key={product!.id}
                href={`/products/${product!.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Image */}
                {product!.images?.[0] && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <Image
                      src={product!.images[0]}
                      alt={product!.name}
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
                      }}
                    >
                      {product!.category}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: "0 0 0.5rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {product!.name}
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
                    {product!.shortDescription}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0d7777",
                    }}
                  >
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {appProducts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "#64748b",
              }}
            >
              No products listed under this application yet.
            </div>
          )}
        </div>
      </section>

      {/* Related Applications */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="accent-line" />
          <h2 className="section-heading">Related Applications</h2>
          <p className="section-subheading">
            Explore other application areas we serve across Maharashtra and India.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {applications
              .filter((a) => a.slug !== slug)
              .slice(0, 4)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/applications/${a.slug}`}
                  style={{
                    display: "block",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {a.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#64748b",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {a.shortDescription}
                  </p>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0d7777",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                  >
                    Explore <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
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
                name: "Applications",
                item: "https://www.vaibhavientp.com/applications",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: app.name,
                item: `https://www.vaibhavientp.com/applications/${app.slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Products for ${app.name}`,
            itemListElement: appProducts.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product!.name,
              url: `https://www.vaibhavientp.com/products/${product!.slug}`,
            })),
          }),
        }}
      />
    </div>
  );
}
