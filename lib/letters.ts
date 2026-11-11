import PDFDocument from "pdfkit";

export type LetterType = "quotation" | "inquiry-ack" | "proforma-invoice";

export type LetterData = {
  type: LetterType;
  letterDate: string;
  letterNumber: string;
  toName: string;
  toCompany: string;
  toEmail: string;
  toAddress: string;
  subject: string;
  body: string;
  items: { description: string; quantity: string; rate: string; amount: string }[];
  subtotal: string;
  tax: string;
  total: string;
  validUntil: string;
  notes: string;
  fromName: string;
  fromCompany: string;
  fromAddress: string;
  fromEmail: string;
  fromPhone: string;
  signature: string;
};

const COMPANY_DEFAULT = {
  name: "Vaibhavi Enterprises",
  address: "N/3, Cama Industrial Estate, Goregaon (E), Mumbai – 400063, Maharashtra, India",
  email: "response@vaibhavientp.com",
  phone: "+91 98200 52056",
};

export function buildLetterData(
  type: LetterType,
  overrides: Partial<LetterData>,
): LetterData {
  const date = new Date().toISOString().slice(0, 10);
  const base: LetterData = {
    type,
    letterDate: date,
    letterNumber: `VE/L/${date.replace(/-/g, "")}/${Math.floor(Math.random() * 9000) + 1000}`,
    toName: "",
    toCompany: "",
    toEmail: "",
    toAddress: "",
    subject: "",
    body: "",
    items: [],
    subtotal: "0",
    tax: "0",
    total: "0",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    notes: "",
    fromName: "Vaibhavi Enterprises",
    fromCompany: COMPANY_DEFAULT.name,
    fromAddress: COMPANY_DEFAULT.address,
    fromEmail: COMPANY_DEFAULT.email,
    fromPhone: COMPANY_DEFAULT.phone,
    signature: "Authorised Signatory",
    ...overrides,
  };

  const templates: Record<LetterType, { subject: string; body: string }> = {
    quotation: {
      subject: "Quotation for Industrial Coating & Filter Products",
      body:
        "We are pleased to submit our quotation for the products detailed below. " +
        "Please review the terms and revert with your purchase order. " +
        "We look forward to serving your requirements.",
    },
    "inquiry-ack": {
      subject: "Acknowledgement of Your Enquiry",
      body:
        "Thank you for your enquiry. We have received your requirements and our technical " +
        "team will review them. A detailed quotation will be shared with you shortly.",
    },
    "proforma-invoice": {
      subject: "Proforma Invoice",
      body:
        "Please find below the proforma invoice for the products discussed. " +
        "Kindly arrange payment as per the terms mentioned to proceed with the order.",
    },
  };

  if (!base.subject) base.subject = templates[type].subject;
  if (!base.body) base.body = templates[type].body;

  return base;
}

export async function generateLetterPDF(data: LetterData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

  const primary = "#0d7777";
  const gray = "#475569";

  // Header
  doc.fillColor(primary).fontSize(20).font("Helvetica-Bold").text(data.fromCompany, 50, 45);
  doc.fillColor(gray).fontSize(9).font("Helvetica").text(data.fromAddress, 50, 70, { width: 260, lineGap: 2 });
  doc.fontSize(8).text(`Email: ${data.fromEmail}  |  Phone: ${data.fromPhone}`, 50, 95);

  // Letter meta block (right side)
  doc.fontSize(8).fillColor(gray);
  doc.text(`Letter No: ${data.letterNumber}`, 350, 45, { align: "right" });
  doc.text(`Date: ${data.letterDate}`, 350, 58, { align: "right" });

  // Separator line
  doc.strokeColor(primary).lineWidth(1.5).moveTo(50, 110).lineTo(547, 110).stroke();

  // To block
  doc.fillColor("#1e293b").fontSize(11).font("Helvetica-Bold").text("To,", 50, 125);
  doc.fontSize(10).font("Helvetica").fillColor(gray);
  let y = 142;
  doc.text(data.toName, 50, y);
  doc.text(data.toCompany, 50, y + 15);
  doc.text(data.toAddress, 50, y + 30, { width: 260, lineGap: 2 });
  if (data.toEmail) doc.text(data.toEmail, 50, y + 52);

  // Subject
  y += 80;
  doc.fillColor("#1e293b").fontSize(10).font("Helvetica-Bold").text("Subject:", 50, y);
  doc.font("Helvetica").fillColor(gray).text(data.subject, 100, y);

  // Body
  y += 30;
  doc.fontSize(10).font("Helvetica").fillColor(gray);
  const bodyLines = doc.widthOfString("") > 0 ? [] : [];
  // Wrap body text manually
  const maxWidth = 497;
  const words = data.body.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const w of words) {
    const test = (line + " " + w).trim();
    if (doc.widthOfString(test, { font: "Helvetica", size: 10 }) > maxWidth) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l) => {
    doc.text(l, 50, y);
    y += 14;
  });

  y += 10;

  // Items table (for quotation / proforma invoice)
  if (data.type === "quotation" || data.type === "proforma-invoice") {
    doc.strokeColor("#cbd5e1").lineWidth(0.5);
    const tableTop = y;
    const colX = [50, 260, 380, 460, 530];
    const headers = ["Description", "Quantity", "Rate", "Amount"];
    doc.fillColor("#1e293b").fontSize(8.5).font("Helvetica-Bold");
    headers.forEach((h, i) => doc.text(h, colX[i], tableTop));
    doc.moveTo(50, tableTop + 12).lineTo(547, tableTop + 12).stroke();

    let rowY = tableTop + 18;
    doc.fontSize(9).font("Helvetica").fillColor(gray);
    (data.items || []).forEach((item) => {
      doc.text(item.description, colX[0], rowY, { width: 200 });
      doc.text(item.quantity, colX[1], rowY);
      doc.text(item.rate, colX[2], rowY);
      doc.text(item.amount, colX[3], rowY);
      rowY += 18;
      doc.moveTo(50, rowY - 4).lineTo(547, rowY - 4).stroke();
    });

    // Totals
    const totalsY = rowY + 6;
    doc.fontSize(9).font("Helvetica-Bold").fillColor("#1e293b");
    doc.text("Subtotal", 380, totalsY);
    doc.text(data.subtotal, 460, totalsY);
    doc.text("Tax", 380, totalsY + 16);
    doc.text(data.tax, 460, totalsY + 16);
    doc.text("Total", 380, totalsY + 32);
    doc.text(data.total, 460, totalsY + 32);
    doc.moveTo(380, totalsY + 48).lineTo(547, totalsY + 48).stroke();

    y = totalsY + 60;
  } else {
    y += 10;
  }

  // Notes
  if (data.notes) {
    doc.fillColor("#1e293b").fontSize(9).font("Helvetica-Bold").text("Notes:", 50, y);
    doc.font("Helvetica").fillColor(gray).fontSize(9).text(data.notes, 50, y + 14, { width: 497, lineGap: 2 });
    y += 50;
  }

  // Validity
  if (data.validUntil) {
    doc.fontSize(9).fillColor(gray).text(`This quotation is valid until ${data.validUntil}.`, 50, y + 10);
    y += 30;
  }

  // Signature
  doc.fontSize(9).fillColor(gray).text("For", 50, y + 10);
  doc.fontSize(10).font("Helvetica-Bold").fillColor("#1e293b").text(data.signature, 50, y + 22);
  doc.fontSize(8).fillColor(gray).text(data.fromCompany, 50, y + 38);

  doc.end();
});
}
