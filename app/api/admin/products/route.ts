import { NextResponse } from "next/server";
import {
  readCollection,
  writeCollection,
  insertItem,
  updateItem,
  deleteItem,
  DbCollection,
} from "@/lib/db";

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

export async function GET() {
  try {
    const products = await readCollection<Product>("products");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<Product, "id" | "createdAt" | "updatedAt">;
    const required = ["name", "slug", "category", "description", "shortDescription"];
    const missing = required.filter((f) => !body[f as keyof typeof body]);
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }
    const product = await insertItem<Product>("products", body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }
    const body = (await req.json()) as Partial<Product>;
    const product = await updateItem<Product>("products", id, body);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }
    const deleted = await deleteItem("products", id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete product" },
      { status: 500 },
    );
  }
}
