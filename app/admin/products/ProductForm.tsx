"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { Save, ArrowLeft, Mail } from "lucide-react";

type Product = {
  id?: string;
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

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  product?: Product;
};

export default function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit" && !!product;
  const id = isEdit ? (product!.id || params.id) : undefined;

  const [form, setForm] = useState<Product>({
    id: "",
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    images: product?.images || [],
    features: product?.features || [],
    applications: product?.applications || [],
    industries: product?.industries || [],
  });

  const handleChange = (field: keyof Product, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "images" | "features" | "applications" | "industries", value: string) => {
    setForm((prev) => {
      const arr = [...(prev[field] || [])];
      const idx = arr.indexOf(value);
      if (idx === -1) arr.push(value);
      else arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: "images" | "features" | "applications" | "industries", value: string) => {
    if (!value.trim()) return;
    setForm((prev) => {
      const arr = [...(prev[field] || [])];
      if (!arr.includes(value.trim())) arr.push(value.trim());
      return { ...prev, [field]: arr };
    });
  };

  const removeArrayItem = (field: "images" | "features" | "applications" | "industries", index: number) => {
    setForm((prev) => {
      const arr = [...(prev[field] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runSubmit();
  };

  async function runSubmit() {
    setError("");
    setLoading(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      description: form.description,
      shortDescription: form.shortDescription,
      images: form.images,
      features: form.features,
      applications: form.applications,
      industries: form.industries,
    };

    try {
      if (isEdit && id) {
        const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create product");
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
      setLoading(false);
    }
  }

  const arrayField = (
    field: "images" | "features" | "applications" | "industries",
    label: string,
    placeholder: string,
  ) => {
    const value = form[field] || [];
    return (
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>{label}</label>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{value.length} item(s)</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          {value.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", backgroundColor: "#e6f4f4", border: "1px solid #b2dfdf", borderRadius: "4px", padding: "0.2rem 0.5rem", fontSize: "0.8rem", color: "#0d7777" }}>
              {item}
              <button
                onClick={() => removeArrayItem(field, i)}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: 0, fontSize: "0.8rem" }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder={placeholder}
            value=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                addArrayItem(field, input.value);
                input.value = "";
              }
            }}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector(`input[placeholder="${placeholder}"]`) as HTMLInputElement | null;
              if (input?.value.trim()) {
                addArrayItem(field, input.value);
                input.value = "";
              }
            }}
            style={{
              padding: "0.5rem 0.75rem",
              backgroundColor: "#0d7777",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => router.push("/admin/products")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
              {isEdit ? "Update product details shown on the website." : "Add a new product to the catalogue."}
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. PTFE Coating"
                style={{
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Slug *</label>
              <input
                name="slug"
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="e.g. ptfe-coating"
                style={{
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="e.g. Coatings"
              style={{
                padding: "0.625rem 0.875rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Short Description</label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              rows={3}
              placeholder="Brief product summary..."
              style={{
                padding: "0.625rem 0.875rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={6}
              placeholder="Full product description..."
              style={{
                padding: "0.625rem 0.875rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          {arrayField("images", "Images", "Image URL...")}
          {arrayField("features", "Features", "Feature...")}
          {arrayField("applications", "Applications", "Application...")}
          {arrayField("industries", "Industries", "Industry...")}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#0d7777",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              alignSelf: "flex-start",
            }}
          >
            {loading ? <><Mail size={16} /> Saving...</> : <><Save size={16} /> {isEdit ? "Update Product" : "Create Product"}</>}
          </button>
        </form>
      </div>
    </div>
  );
}
