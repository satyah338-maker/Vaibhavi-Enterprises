"use client";

import { useState, useRef } from "react";
import { products } from "@/data/products";
import {
  Send,
  User,
  Building,
  Mail,
  Phone,
  Package,
  Hash,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Factory,
  Paperclip,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const CITIES = ["Mumbai", "Pune", "Nashik", "Thane", "Nagpur", "Aurangabad", "Other"];

const APPLICATIONS = [
  "Chemical Processing",
  "Food & Beverage",
  "Pharmaceutical",
  "Oil & Gas",
  "Water Treatment",
  "Automotive",
  "Textile",
  "Marine",
  "Other",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".dwg", ".jpg", ".jpeg", ".png"];
const TOTAL_STEPS = 4;

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  product: string;
  application: string;
  quantity: string;
  requirements: string;
  file: File | null;
}

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  fontSize: "0.9rem",
  color: "#1e293b",
  backgroundColor: "#ffffff",
  outline: "none",
  fontFamily: "inherit",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#1e293b",
  marginBottom: "0.375rem",
};

const ICON_STYLE: React.CSSProperties = { color: "#0d7777" };

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  product: "",
  application: "",
  quantity: "",
  requirements: "",
  file: null,
};

const steps = [
  { number: 1, title: "Contact Details", icon: <User size={13} style={ICON_STYLE} /> },
  { number: 2, title: "Product & Application", icon: <Package size={13} style={ICON_STYLE} /> },
  { number: 3, title: "Technical Requirements", icon: <FileText size={13} style={ICON_STYLE} /> },
  { number: 4, title: "Review & Submit", icon: <CheckCircle size={13} style={ICON_STYLE} /> },
];

export default function EnquiryPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [stepError, setStepError] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileError("");
    if (!file) {
      setFormData((prev) => ({ ...prev, file: null }));
      return;
    }
    const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    if (!ACCEPTED_FILE_EXTENSIONS.includes(ext)) {
      setFileError("Please upload a PDF, DWG, JPG, or PNG file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be under 10 MB.");
      return;
    }
    setFormData((prev) => ({ ...prev, file }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.name.trim() && formData.email.trim() && formData.phone.trim());
      case 2:
        return Boolean(formData.product.trim());
      default:
        return true;
    }
  };

  const goToStep = (step: number) => {
    if (step < 1 || step > TOTAL_STEPS) return;
    setCurrentStep(step);
    setStatus("");
    setStepError("");
    setFileError("");
  };

  const nextStep = () => {
    setStepError("");
    if (!validateStep(currentStep)) {
      setStepError("Please fill the required fields before continuing.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setStepError("");
    setCurrentStep(currentStep - 1);
  };

  const productName = products.find((p) => p.id === formData.product)?.name || "—";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError("");
    setFileError("");
    if (!validateStep(1) || !validateStep(2)) {
      setStepError("Please fill the required fields before submitting.");
      goToStep(1);
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("company", formData.company);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("city", formData.city);
      payload.append("product", formData.product);
      payload.append("application", formData.application);
      payload.append("quantity", formData.quantity);
      payload.append("requirements", formData.requirements);
      if (formData.file) {
        payload.append("file", formData.file, formData.file.name);
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: payload,
      });
      if (response.ok) {
        setStatus("success");
        setCurrentStep(1);
        setFormData(initialFormData);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "3rem 0 2.5rem" }}>
        <div className="container">
          <p style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Enquiry
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.75rem" }}>
            Request a Quote
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
            Fill in your requirements below and our technical team will respond within 24 hours with a customised solution.
          </p>
        </div>
      </div>

      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "2rem",
              alignItems: "flex-start",
            }}
            className="enquiry-grid"
          >
            {/* Form */}
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
                <Send size={18} style={{ color: "#0d7777" }} />
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Your Requirements</h2>
              </div>

              {status && (
                <div
                  style={{
                    marginBottom: "1.25rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    backgroundColor: status === "success" ? "#f0fdf4" : "#fff1f2",
                    border: `1px solid ${status === "success" ? "#bbf7d0" : "#fecdd3"}`,
                  }}
                >
                  {status === "success" ? (
                    <CheckCircle size={18} style={{ color: "#16a34a", flexShrink: 0, marginTop: "1px" }} />
                  ) : (
                    <AlertCircle size={18} style={{ color: "#dc2626", flexShrink: 0, marginTop: "1px" }} />
                  )}
                  <p style={{ fontSize: "0.875rem", color: status === "success" ? "#15803d" : "#b91c1c", margin: 0, lineHeight: 1.6 }}>
                    {status === "success"
                      ? "Thank you! Your enquiry has been submitted. We'll get back to you within 24 hours."
                      : "There was an error submitting your enquiry. Please try again or contact us directly."}
                  </p>
                </div>
              )}

              {stepError && (
                <div style={{ marginBottom: "1rem", padding: "0.875rem 1rem", borderRadius: "6px", backgroundColor: "#fff1f2", border: "1px solid #fecdd3" }}>
                  <p style={{ fontSize: "0.875rem", color: "#b91c1c", margin: 0, lineHeight: 1.6 }}>{stepError}</p>
                </div>
              )}

              {/* Progress indicator */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Enquiry Form
                </p>
                <div className="progress-steps" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {steps.map((step, idx) => (
                    <>
                      <div
                        key={step.number}
                        className="progress-step"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.375rem",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${currentStep >= step.number ? "#0d7777" : "#e2e8f0"}`,
                            backgroundColor: currentStep >= step.number ? "#0d7777" : "#ffffff",
                            color: currentStep >= step.number ? "#ffffff" : "#64748b",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                          }}
                        >
                          {currentStep >= step.number ? <CheckCircle size={14} style={{ color: "#ffffff" }} /> : step.number}
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: currentStep >= step.number ? "#0d7777" : "#94a3b8",
                            textAlign: "center",
                            lineHeight: 1.2,
                          }}
                        >
                          {step.title}
                        </span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className="progress-line"
                          style={{
                            flex: 1,
                            height: "2px",
                            backgroundColor: currentStep > step.number ? "#0d7777" : "#e2e8f0",
                          }}
                        />
                      )}
                    </>
                  ))}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 600, marginTop: "0.75rem" }}>
                  Step {currentStep} of {TOTAL_STEPS}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Contact */}
                {currentStep === 1 && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" style={LABEL_STYLE}>
                          <User size={13} style={ICON_STYLE} /> Full Name *
                        </label>
                        <input id="name" required placeholder="Your full name" style={FIELD_STYLE} value={formData.name} onChange={setField("name")} />
                      </div>
                      {/* Company */}
                      <div>
                        <label htmlFor="company" style={LABEL_STYLE}>
                          <Building size={13} style={ICON_STYLE} /> Company Name
                        </label>
                        <input id="company" placeholder="Your company" style={FIELD_STYLE} value={formData.company} onChange={setField("company")} />
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="email" style={LABEL_STYLE}>
                          <Mail size={13} style={ICON_STYLE} /> Email *
                        </label>
                        <input id="email" type="email" required placeholder="your@email.com" style={FIELD_STYLE} value={formData.email} onChange={setField("email")} />
                      </div>
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" style={LABEL_STYLE}>
                          <Phone size={13} style={ICON_STYLE} /> Phone *
                        </label>
                        <input id="phone" type="tel" required placeholder="10-digit number" style={FIELD_STYLE} value={formData.phone} onChange={setField("phone")} />
                      </div>
                      {/* City */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor="city" style={LABEL_STYLE}>
                          <MapPin size={13} style={ICON_STYLE} /> City
                        </label>
                        <select id="city" style={FIELD_STYLE} value={formData.city} onChange={setField("city")}>
                          <option value="">Select your city</option>
                          {CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Product & Application */}
                {currentStep === 2 && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                      {/* Product */}
                      <div>
                        <label htmlFor="product" style={LABEL_STYLE}>
                          <Package size={13} style={ICON_STYLE} /> Product *
                        </label>
                        <select id="product" required style={FIELD_STYLE} value={formData.product} onChange={setField("product")}>
                          <option value="">Select a product</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      {/* Application */}
                      <div>
                        <label htmlFor="application" style={LABEL_STYLE}>
                          <Factory size={13} style={ICON_STYLE} /> Application / Industry
                        </label>
                        <select id="application" style={FIELD_STYLE} value={formData.application} onChange={setField("application")}>
                          <option value="">Select an industry</option>
                          {APPLICATIONS.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                      {/* Quantity */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label htmlFor="quantity" style={LABEL_STYLE}>
                          <Hash size={13} style={ICON_STYLE} /> Quantity
                        </label>
                        <input id="quantity" placeholder="e.g., 100 units" style={FIELD_STYLE} value={formData.quantity} onChange={setField("quantity")} />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Technical Requirements */}
                {currentStep === 3 && (
                  <>
                    {/* Requirements */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="requirements" style={LABEL_STYLE}>
                        <FileText size={13} style={ICON_STYLE} /> Specific Requirements
                      </label>
                      <textarea
                        id="requirements"
                        rows={5}
                        placeholder="Describe your substrate, application environment, temperature range, quantity, or any special requirements..."
                        style={{ ...FIELD_STYLE, resize: "none" }}
                        value={formData.requirements}
                        onChange={setField("requirements")}
                      />
                    </div>

                    {/* File upload */}
                    <div>
                      <label htmlFor="file" style={LABEL_STYLE}>
                        <Paperclip size={13} style={ICON_STYLE} /> Drawings / Specifications
                      </label>
                      <input
                        id="file"
                        type="file"
                        accept=".pdf,.dwg,.jpg,.jpeg,.png"
                        style={{ ...FIELD_STYLE, paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      {fileError && (
                        <p style={{ fontSize: "0.8rem", color: "#b91c1c", marginTop: "0.375rem" }}>{fileError}</p>
                      )}
                      {formData.file && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "0.5rem",
                            padding: "0.5rem 0.875rem",
                            backgroundColor: "#f0fdfa",
                            border: "1px solid #ccfbf1",
                            borderRadius: "6px",
                          }}
                        >
                          <Paperclip size={14} style={{ color: "#0d7777" }} />
                          <span style={{ fontSize: "0.85rem", color: "#1e293b", flex: 1 }}>{formData.file.name}</span>
                          <button type="button" onClick={removeFile} style={{ background: "none", border: "none", color: "#dc2626", fontSize: "0.8rem", cursor: "pointer", padding: 0 }}>
                            <X size={14} /> Remove
                          </button>
                        </div>
                      )}
                      <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.375rem" }}>
                        Accepted: PDF, DWG, JPG, PNG (max 10 MB)
                      </p>
                    </div>
                  </>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Full Name
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.name || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Company
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.company || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Email
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.email || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Phone
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.phone || "—"}</p>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        City
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.city || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Product
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{productName}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Application / Industry
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.application || "—"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Quantity
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.quantity || "—"}</p>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Specific Requirements
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0, whiteSpace: "pre-wrap" }}>{formData.requirements || "—"}</p>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>
                        Drawings / Specifications
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0 }}>{formData.file ? formData.file.name : "No file attached"}</p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.75rem", gap: "0.75rem" }}>
                  {currentStep > 1 && (
                    <button type="button" onClick={prevStep} disabled={loading} className="btn-outline" style={{ padding: "0.625rem 1.375rem", fontSize: "0.9rem" }}>
                      <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} /> Back
                    </button>
                  )}
                  {currentStep < TOTAL_STEPS ? (
                    <button type="button" onClick={nextStep} disabled={loading || !validateStep(currentStep)} className="btn-primary" style={{ padding: "0.625rem 1.375rem", fontSize: "0.9rem" }}>
                      Next <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                    </button>
                  ) : (
                    <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "0.625rem 1.375rem", fontSize: "0.9rem" }}>
                      {loading ? (
                        <>
                          <Loader2 size={18} style={{ animation: "spin 1s linear infinite", marginRight: "0.5rem" }} /> Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} style={{ marginRight: "0.5rem" }} /> Submit Enquiry
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: <CheckCircle size={20} />, title: "Quick Response", text: "We respond to all enquiries within 24 working hours." },
                { icon: <User size={20} />, title: "Expert Consultation", text: "Our technical team will recommend the right coating or filter for your application." },
                { icon: <Package size={20} />, title: "Custom Solutions", text: "We tailor grade, thickness, pore size, and color to your exact requirements." },
              ].map((item) => (
                <div key={item.title} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "#0d7777", marginBottom: "0.5rem" }}>
                    {item.icon}
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                </div>
              ))}

              <div style={{ backgroundColor: "#0d7777", borderRadius: "8px", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>Prefer to call?</h3>
                <a href="tel:+919820052056" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", textDecoration: "none", marginBottom: "0.25rem" }}>
                  +91 98200 52056
                </a>
                <a href="tel:+919820052057" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
                  +91 98200 52057
                </a>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", marginTop: "0.5rem", marginBottom: 0 }}>Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 767px) {
          .enquiry-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
          .progress-steps { flex-direction: column !important; align-items: center !important; gap: 0.75rem !important; }
          .progress-line { display: none !important; }
        }
      `}</style>
    </div>
  );
}
