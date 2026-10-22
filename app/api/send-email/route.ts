import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: Wire up an email service (e.g. Nodemailer / Resend / SendGrid)
    // with SMTP credentials before sending real emails in production.
    console.log("[Enquiry] New submission received:", body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
