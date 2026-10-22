import { Metadata } from "next";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Our Products | Vaibhavi Enterprises",
  description: "Browse our complete range of high-performance industrial coatings and filtration solutions.",
};

export default function ProductsPage() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "4rem 0" }}>
      <div className="container">
        <div className="accent-line" />
        <h1 className="section-heading" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          All Products &amp; Services
        </h1>
        <p className="section-subheading" style={{ marginBottom: "3rem" }}>
          Explore our complete range of high-performance industrial coatings, porous plastic filters, and specialized surface treatments engineered for precision, durability, and compliance.
        </p>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
