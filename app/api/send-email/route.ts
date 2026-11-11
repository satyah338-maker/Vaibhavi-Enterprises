import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { insertItem, type DbItem } from "@/lib/db";
import { generateLetterPDF, buildLetterData, type LetterData } from "@/lib/letters";

type EnquiryRow = DbItem & {
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
};

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "enquiries");
const LETTER_DIR = path.join(process.cwd(), "public", "uploads", "letters");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const company = formData.get("company");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const city = formData.get("city");
    const product = formData.get("product");
    const application = formData.get("application");
    const quantity = formData.get("quantity");
    const requirements = formData.get("requirements");

    const missing = [
      "name",
      "company",
      "email",
      "phone",
      "city",
      "product",
      "application",
      "quantity",
      "requirements",
    ].filter((field) => !formData.get(field));

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const drawingFile = formData.get("drawing") ?? formData.get("specs");

    let filePath: string | null = null;
    if (drawingFile instanceof File) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      const timestamp = Date.now();
      const originalName = drawingFile.name.replace(/\s+/g, "_");
      const uniqueFilename = `${timestamp}-${originalName}`;
      const fileDestination = path.join(UPLOAD_DIR, uniqueFilename);

      const arrayBuffer = await drawingFile.arrayBuffer();
      await fs.writeFile(fileDestination, Buffer.from(arrayBuffer));

      filePath = `/uploads/enquiries/${uniqueFilename}`;
    }

    // Persist enquiry to the database (workflow automation)
    const enquiry = await insertItem<EnquiryRow>("enquiries", {
      name: String(name),
      company: String(company),
      email: String(email),
      phone: String(phone),
      city: String(city),
      product: String(product),
      application: String(application),
      quantity: String(quantity),
      requirements: String(requirements),
      filePath,
      status: "new",
    });

    // Auto-generate acknowledgement letter PDF
    let letterPath: string | null = null;
    try {
      await fs.mkdir(LETTER_DIR, { recursive: true });
      const letterData: LetterData = {
        type: "inquiry-ack",
        letterDate: new Date().toISOString().slice(0, 10),
        letterNumber: `VE/L/${new Date().toISOString().slice(0, 10).replace(/-/g, "")}/${Math.floor(Math.random() * 9000) + 1000}`,
        toName: String(name),
        toCompany: String(company),
        toEmail: String(email),
        toAddress: "",
        subject: "Acknowledgement of Your Enquiry – Vaibhavi Enterprises",
        body: `Dear ${name},\n\nThank you for your enquiry regarding ${product} for your ${application} application in ${city}.\n\nWe have received your requirements and our technical team will review them. A detailed quotation will be shared with you shortly.\n\nFor any urgent queries, please contact us at response@vaibhavientp.com or +91 98200 52056.\n\nBest regards,\nVaibhavi Enterprises\nMumbai, India`,
        items: [],
        subtotal: "0",
        tax: "0",
        total: "0",
        validUntil: "",
        notes: `Enquiry ID: ${enquiry.id}`,
        fromName: "Vaibhavi Enterprises",
        fromCompany: "Vaibhavi Enterprises",
        fromAddress: "N/3, Cama Industrial Estate, Goregaon (E), Mumbai – 400063, Maharashtra, India",
        fromEmail: "response@vaibhavientp.com",
        fromPhone: "+91 98200 52056",
        signature: "Authorised Signatory",
      };
      const pdfBuffer = await generateLetterPDF(letterData);
      const letterFilename = `${letterData.letterNumber}.pdf`.replace(/\//g, "_");
      const letterDestination = path.join(LETTER_DIR, letterFilename);
      await fs.mkdir(path.dirname(letterDestination), { recursive: true });
      await fs.writeFile(letterDestination, pdfBuffer);
      letterPath = `/uploads/letters/${letterFilename}`;
    } catch (letterErr) {
      console.error("[Letter] Generation failed:", letterErr);
    }

    // TODO: Connect SMTP here to actually send the email with the letter attached.
    // For now the acknowledgement is logged and the letter PDF is saved.
    console.log("[Enquiry] New submission received:", {
      id: enquiry.id,
      name,
      company,
      email,
      phone,
      city,
      product,
      application,
      quantity,
      requirements,
      filePath,
      letterPath,
    });

    return NextResponse.json(
      { success: true, filePath, letterPath, enquiryId: enquiry.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Enquiry] Submission failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 500 },
    );
  }
}
