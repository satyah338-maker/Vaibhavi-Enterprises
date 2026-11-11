import { NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, shortDescription } = body as {
      name?: string;
      category?: string;
      shortDescription?: string;
    };

    if (!name) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    const description = await generateProductDescription({
      name,
      category: category || "",
      shortDescription: shortDescription || "",
    });

    return NextResponse.json({ description });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate description" },
      { status: 500 },
    );
  }
}
