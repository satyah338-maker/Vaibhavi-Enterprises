import { NextResponse } from "next/server";
import {
  readCollection,
  insertItem,
  updateItem,
  deleteItem,
} from "@/lib/db";

type Quote = {
  id: string;
  quoteNumber: string;
  enquiryId: string | null;
  clientName: string;
  company: string;
  email: string;
  product: string;
  quantity: string;
  amount: number;
  tax: number;
  total: number;
  status: string;
  validUntil: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const quotes = await readCollection<Quote>("quotes");
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch quotes" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<Quote, "id" | "createdAt" | "updatedAt">;
    const required = ["quoteNumber", "clientName", "company", "email", "product", "quantity", "amount", "total", "status", "validUntil"];
    const missing = required.filter((f) => body[f as keyof typeof body] === undefined || body[f as keyof typeof body] === "");
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }
    const quote = await insertItem<Quote>("quotes", {
      ...body,
      amount: Number(body.amount) || 0,
      tax: Number(body.tax) || 0,
      total: Number(body.total) || 0,
      status: body.status || "draft",
      enquiryId: body.enquiryId || null,
      notes: body.notes || "",
    });
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create quote" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Quote id is required" }, { status: 400 });
    }
    const body = (await req.json()) as Partial<Quote>;
    const quote = await updateItem<Quote>("quotes", id, body);
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update quote" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Quote id is required" }, { status: 400 });
    }
    const deleted = await deleteItem("quotes", id);
    if (!deleted) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete quote" },
      { status: 500 },
    );
  }
}
