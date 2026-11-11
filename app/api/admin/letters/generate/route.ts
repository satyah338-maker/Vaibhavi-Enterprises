import { NextResponse } from "next/server";
import { generateLetterPDF, buildLetterData, type LetterData } from "@/lib/letters";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      type?: string;
      letterDate?: string;
      letterNumber?: string;
      toName?: string;
      toCompany?: string;
      toEmail?: string;
      toAddress?: string;
      subject?: string;
      body?: string;
      items?: string;
      subtotal?: string;
      tax?: string;
      total?: string;
      validUntil?: string;
      notes?: string;
      fromName?: string;
      fromCompany?: string;
      fromAddress?: string;
      fromEmail?: string;
      fromPhone?: string;
      signature?: string;
    };

    const type = (body.type || "quotation") as "quotation" | "inquiry-ack" | "proforma-invoice";

    const items: { description: string; quantity: string; rate: string; amount: string }[] = [];
    if (body.items) {
      try {
        const parsed = JSON.parse(body.items);
        if (Array.isArray(parsed)) {
          parsed.forEach((it) => {
            const item = it as { description?: string; quantity?: string; rate?: string; amount?: string };
            items.push({
              description: item.description || "",
              quantity: item.quantity || "",
              rate: item.rate || "",
              amount: item.amount || "",
            });
          });
        }
      } catch {
        // ignore malformed items
      }
    }

    const data: LetterData = buildLetterData(type, {
      letterDate: body.letterDate || new Date().toISOString().slice(0, 10),
      letterNumber: body.letterNumber || `VE/L/${new Date().toISOString().slice(0, 10).replace(/-/g, "")}/${Math.floor(Math.random() * 9000) + 1000}`,
      toName: body.toName || "",
      toCompany: body.toCompany || "",
      toEmail: body.toEmail || "",
      toAddress: body.toAddress || "",
      subject: body.subject || "",
      body: body.body || "",
      items,
      subtotal: body.subtotal || "0",
      tax: body.tax || "0",
      total: body.total || "0",
      validUntil: body.validUntil || "",
      notes: body.notes || "",
      fromName: body.fromName || "Vaibhavi Enterprises",
      fromCompany: body.fromCompany || "Vaibhavi Enterprises",
      fromAddress: body.fromAddress || "N/3, Cama Industrial Estate, Goregaon (E), Mumbai – 400063, Maharashtra, India",
      fromEmail: body.fromEmail || "response@vaibhavientp.com",
      fromPhone: body.fromPhone || "+91 98200 52056",
      signature: body.signature || "Authorised Signatory",
    });

    const pdfBuffer = await generateLetterPDF(data);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${data.letterNumber}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate letter" },
      { status: 500 },
    );
  }
}
