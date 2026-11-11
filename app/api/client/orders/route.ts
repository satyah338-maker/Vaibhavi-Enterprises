import { NextResponse } from "next/server";
import { readCollection, type DbItem } from "@/lib/db";

type QuoteRow = DbItem & {
  quoteNumber: string;
  clientName: string;
  product: string;
  quantity: string;
  total: number;
  status: string;
};

export async function GET() {
  try {
    const quotes = await readCollection<QuoteRow>("quotes");

    const orders = quotes.map((q) => ({
      id: `ORD-${q.id}`,
      quoteNumber: q.quoteNumber,
      date: q.createdAt.slice(0, 10),
      status: q.status as "pending" | "quoted" | "in-progress" | "completed" | "delivered",
      statusLabel: q.status.charAt(0).toUpperCase() + q.status.slice(1),
      product: q.product,
      quantity: q.quantity,
      total: `₹${Number(q.total).toLocaleString("en-IN")}`,
      downloadable: true,
    }));

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
