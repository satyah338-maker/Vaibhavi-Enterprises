export type AIMessage = { role: "system" | "user" | "assistant"; content: string };

const API_KEY = process.env.OPENAI_API_KEY || "";
const BASE_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function isConfigured() {
  return Boolean(API_KEY);
}

async function callAI(messages: AIMessage[], options: { temperature?: number; maxTokens?: number } = {}) {
  if (!isConfigured()) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: options.temperature ?? 0.4,
      max_tokens: options.maxTokens ?? 800,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateProductDescription(product: {
  name: string;
  category: string;
  shortDescription: string;
}) {
  const system: AIMessage = {
    role: "system",
    content:
      "You are an expert industrial coatings copywriter for Vaibhavi Enterprises (Mumbai, India). " +
      "Write a professional, concise, benefit-focused product description (3-5 sentences) for a B2B audience. " +
      "Use Indian English spelling. Mention durability, corrosion resistance, and industrial applications. " +
      "Do not invent certifications. Output only the description text.",
  };
  const user: AIMessage = {
    role: "user",
    content: `Product: ${product.name}\nCategory: ${product.category}\nShort description: ${product.shortDescription}`,
  };

  if (!isConfigured()) {
    // Fallback: template-based description so the feature works without an API key.
    return `${product.name} is a high-performance ${product.category.toLowerCase()} solution engineered for demanding industrial applications. ${product.shortDescription || ""} It offers excellent durability, corrosion resistance, and long service life, reducing maintenance costs for chemical, pharmaceutical, oil & gas, and food processing plants across Maharashtra. Backed by Vaibhavi Enterprises' in-house coating shop since 1989.`;
  }

  try {
    return await callAI([system, user]);
  } catch (err) {
    console.error("[AI] generateProductDescription failed:", err);
    return `${product.name} is a high-performance ${product.category.toLowerCase()} solution engineered for demanding industrial applications. ${product.shortDescription || ""}`;
  }
}

export async function generateEmailReply(enquiry: {
  name: string;
  company: string;
  product: string;
  application: string;
  city: string;
  requirements: string;
}) {
  const system: AIMessage = {
    role: "system",
    content:
      "You write courteous, professional B2B email replies for Vaibhavi Enterprises, an industrial coatings and porous plastic filters company based in Mumbai, India. " +
      "Acknowledge the enquiry, confirm next steps, and keep it concise. Output only the email body text.",
  };
  const user: AIMessage = {
    role: "user",
    content: `Customer: ${enquiry.name} (${enquiry.company}, ${enquiry.city})\nProduct: ${enquiry.product}\nApplication: ${enquiry.application}\nRequirements: ${enquiry.requirements}`,
  };

  if (!isConfigured()) {
    return `Dear ${enquiry.name},\n\nThank you for your enquiry regarding ${enquiry.product} for your ${enquiry.application} application in ${enquiry.city}.\n\nWe have received your requirements and our technical team will review them shortly. We will share a detailed quotation with you at the earliest.\n\nFor any urgent queries, please contact us at response@vaibhavientp.com or +91 98200 52056.\n\nBest regards,\nVaibhavi Enterprises\nMumbai, India`;
  }

  try {
    return await callAI([system, user]);
  } catch (err) {
    console.error("[AI] generateEmailReply failed:", err);
    return `Dear ${enquiry.name},\n\nThank you for your enquiry regarding ${enquiry.product}. We will get back to you shortly with a detailed quotation.\n\nBest regards,\nVaibhavi Enterprises`;
  }
}

export async function chatReply(message: string, history: AIMessage[] = []) {
  const system: AIMessage = {
    role: "system",
    content:
      "You are the assistant for Vaibhavi Enterprises, an industrial coatings and porous plastic filters company in Mumbai, India (since 1989). " +
      "Answer questions about PTFE, FBE, HALAR, PVDF, PFA coatings and Vaicon porous plastic filters. " +
      "Be helpful, concise, and professional. If you don't know something, suggest contacting response@vaibhavientp.com or +91 98200 52056.",
  };
  const messages = [system, ...history, { role: "user", content: message }];

  if (!isConfigured()) {
    return "I'm the Vaibhavi Enterprises assistant. AI chat is not configured at the moment. For product enquiries, please email response@vaibhavientp.com or WhatsApp +91 98200 52056.";
  }

  try {
    return await callAI(messages);
  } catch (err) {
    console.error("[AI] chatReply failed:", err);
    return "I'm unable to respond right now. Please email response@vaibhavientp.com or WhatsApp +91 98200 52056 for assistance.";
  }
}
