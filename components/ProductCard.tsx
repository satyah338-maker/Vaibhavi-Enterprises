import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        textDecoration: "none",
        height: "100%",
      }}
    >
      {/* Image Container with Hover Overlay */}
      {product.images?.[0] && (
        <div
          className="product-card-image"
          style={{
            position: "relative",
            width: "100%",
            height: "220px",
            backgroundColor: "#f8fafc",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category badge */}
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
            {product.category}
          </span>
          {/* Hover Overlay with Details */}
          <div
            className="product-card-overlay"
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
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.5,
                  margin: 0,
                  maxHeight: "4.5rem",
                  overflow: "hidden",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {product.shortDescription}
              </p>
            </div>
            <div className="product-card-overlay-content">
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
                View Details <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
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
          {product.name}
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
          {product.shortDescription}
        </p>

        {/* Key features preview */}
        <div style={{ marginBottom: "1rem" }}>
          {product.features.slice(0, 3).map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                color: "#475569",
                marginBottom: "0.25rem",
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#0d7777", flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
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
  );
}
