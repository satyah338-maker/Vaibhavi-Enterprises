import { NextResponse } from "next/server";
import {
  readCollection,
  insertItem,
  updateItem,
  deleteItem,
} from "@/lib/db";

type Client = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  industry: string;
  status: string;
  totalOrders: number;
  lastOrderDate: string;
  createdAt: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const clients = await readCollection<Client>("clients");
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch clients" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<Client, "id" | "createdAt" | "updatedAt">;
    const client = await insertItem<Client>("clients", body);
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create client" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Client id is required" }, { status: 400 });
    }
    const body = (await req.json()) as Partial<Client>;
    const client = await updateItem<Client>("clients", id, body);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update client" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Client id is required" }, { status: 400 });
    }
    const deleted = await deleteItem("clients", id);
    if (!deleted) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete client" },
      { status: 500 },
    );
  }
}
