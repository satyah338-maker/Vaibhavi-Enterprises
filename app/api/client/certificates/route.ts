import { NextResponse } from "next/server";
import { readCollection, type DbItem } from "@/lib/db";

type CertificateRow = DbItem & {
  name: string;
  date: string;
  type: string;
  url: string;
};

export async function GET() {
  try {
    const certificates = await readCollection<CertificateRow>("certificates");
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch certificates" },
      { status: 500 },
    );
  }
}
