import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { products, getProductBySlug } from "@/data/products";
import ProductImageSlider from "@/components/ProductImageSlider";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "2rem 0",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#64748b", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Products</Link>
            <span>/</span>
            <span style={{ color: "#1e293b" }}>{product.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
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
                {product.category}
              </span>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.5rem" }}>
                {product.name}
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.925rem", margin: 0, maxWidth: "500px", lineHeight: 1.6 }}>
                {product.shortDescription}
              </p>
            </div>
            <Link href="/enquiry" className="btn-primary">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ padding: "3rem 0" }}>
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
            {/* Images */}
            <div className="w-full" style={{ minWidth: 0 }}>
              <ProductImageSlider images={product.images || []} productName={product.name} />
            </div>

            {/* Details */}
            <div style={{ minWidth: 0 }}>
              {/* Description */}
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.75rem" }}>
                  Overview
                </h2>
                <p style={{ color: "#475569", lineHeight: 1.85, fontSize: "0.9rem", margin: 0 }}>
                  {product.description}
                </p>
              </div>

              {/* Features & Applications side by side */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#64748b",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Key Features
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {product.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                        <CheckCircle size={14} style={{ color: "#0d7777", marginTop: "2px", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#64748b",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Applications
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {product.applications.map((a) => (
                      <li key={a} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#475569" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#0d7777", marginTop: "6px", flexShrink: 0 }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Industries */}
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#64748b",
                    marginBottom: "0.625rem",
                  }}
                >
                  Industries Served
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {product.industries.map((ind) => (
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

              {/* CTA */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.9rem", margin: "0 0 0.125rem" }}>
                    Interested in this product?
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                    Request a custom quote or speak to our technical team.
                  </p>
                </div>
                <Link href="/enquiry" className="btn-primary">
                  Make Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related / Other Products */}
      <section style={{ padding: "3rem 0", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
              Other Products
            </h2>
            <Link href="/" style={{ fontSize: "0.85rem", color: "#0d7777", textDecoration: "none", fontWeight: 600 }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {products
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="hover-border-primary"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1.25rem",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#0d7777", textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.category}</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>{p.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.shortDescription}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0d7777", marginTop: "auto" }}>Learn more →</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="container" style={{ padding: "1.25rem 0" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.85rem", color: "#64748b", textDecoration: "none", fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Home
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
                name: "Products",
                item: "https://www.vaibhavientp.com/products",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `https://www.vaibhavientp.com/products/${product.slug}`,
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
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            brand: {
              "@type": "Brand",
              name: "Vaibhavi Enterprises",
            },
            category: product.category,
            url: `https://www.vaibhavientp.com/products/${product.slug}`,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "INR",
            },
          }),
        }}
      />
    </div>
  );
}
