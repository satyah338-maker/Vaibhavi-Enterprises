"use client";

import { useEffect, useState } from "react";
import ProductForm from "../ProductForm";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  applications: string[];
  industries: string[];
};

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data: Product[] = await res.json();
        const id = window.location.pathname.split("/").pop();
        setProduct(data.find((p) => p.id === id) || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading product...</div>;
  if (!product) return <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Product not found.</div>;

  return <ProductForm mode="edit" product={product} />;
}
