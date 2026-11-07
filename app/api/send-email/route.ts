import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "enquiries");

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

    console.log("[Enquiry] New submission received:", {
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
    });

    return NextResponse.json(
      { success: true, filePath },
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
