import { NextResponse } from "next/server";
import {
  readCollection,
  insertItem,
  updateItem,
  deleteItem,
} from "@/lib/db";

type Enquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  product: string;
  application: string;
  quantity: string;
  requirements: string;
  filePath: string | null;
  status: string;
  quoteId: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const enquiries = await readCollection<Enquiry>("enquiries");
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch enquiries" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<Enquiry, "id" | "createdAt" | "updatedAt">;
    const required = ["name", "company", "email", "phone", "city", "product", "application", "quantity", "requirements"];
    const missing = required.filter((f) => !body[f as keyof typeof body]);
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }
    const enquiry = await insertItem<Enquiry>("enquiries", {
      ...body,
      status: body.status || "new",
      quoteId: body.quoteId || null,
      filePath: body.filePath || null,
    });
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create enquiry" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Enquiry id is required" }, { status: 400 });
    }
    const body = (await req.json()) as Partial<Enquiry>;
    const enquiry = await updateItem<Enquiry>("enquiries", id, body);
    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update enquiry" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Enquiry id is required" }, { status: 400 });
    }
    const deleted = await deleteItem("enquiries", id);
    if (!deleted) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete enquiry" },
      { status: 500 },
    );
  }
}
