"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit, Plus, Search } from "lucide-react";

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
  createdAt: string;
  updatedAt: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#0d7777",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              <Plus size={20} />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              Products
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
              Manage your product catalogue shown on the website.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "0.625rem 1rem",
                border: "none",
                outline: "none",
                fontSize: "0.9rem",
                minWidth: "220px",
              }}
            />
            <button
              style={{
                padding: "0.625rem 1rem",
                backgroundColor: "#0d7777",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Search size={16} />
            </button>
          </div>
          <Link
            href="/admin/products/new"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#0d7777",
              color: "#ffffff",
              padding: "0.7rem 1.25rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
            Loading products...
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "3rem",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No products found.
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Name
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Category
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Slug
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Short Description
                    </th>
                    <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr key={product.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>
                        {product.name}
                      </td>
                      <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569" }}>
                        {product.category}
                      </td>
                      <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", fontFamily: "monospace" }}>
                        {product.slug}
                      </td>
                      <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#475569", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {product.shortDescription}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link
                            href={`/admin/products/${product.id}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "34px",
                              height: "34px",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              backgroundColor: "#f8fafc",
                              color: "#0d7777",
                              textDecoration: "none",
                              fontSize: "0.85rem",
                            }}
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "34px",
                              height: "34px",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              backgroundColor: "#fef2f2",
                              color: "#ef4444",
                              cursor: deleting === product.id ? "not-allowed" : "pointer",
                              fontSize: "0.85rem",
                              opacity: deleting === product.id ? 0.7 : 1,
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
