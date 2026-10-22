import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <p style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Contact
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.75rem" }}>
            Get in Touch
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
            We&apos;re happy to answer your questions, discuss coating requirements, or provide a quote for your project.
          </p>
        </div>
      </div>

      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "flex-start",
            }}
            className="responsive-grid-1"
          >
            {/* Contact Details */}
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#0d7777",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Contact Information
                  </h2>
                </div>
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#0d7777",
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>Address</h3>
                      <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                        N/3, Cama Industrial Estate,<br />
                        Opp. Jaipan Industries, Walbhat Road,<br />
                        Goregaon (East), Mumbai – 400063<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#0d7777",
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>Phone</h3>
                      <a href="tel:+919820052056" style={{ display: "block", fontSize: "0.875rem", color: "#64748b", textDecoration: "none", marginBottom: "0.125rem" }}>+91 98200 52056</a>
                      <a href="tel:+919820052057" style={{ display: "block", fontSize: "0.875rem", color: "#64748b", textDecoration: "none", marginBottom: "0.125rem" }}>+91 98200 52057</a>
                      <a href="tel:02249789807" style={{ display: "block", fontSize: "0.875rem", color: "#64748b", textDecoration: "none" }}>022-4978 9807</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#0d7777",
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>Email</h3>
                      <a href="mailto:response@vaibhavientp.com" style={{ display: "block", fontSize: "0.875rem", color: "#0d7777", textDecoration: "none", marginBottom: "0.125rem" }}>response@vaibhavientp.com</a>
                      <a href="mailto:vaibhavient@gmail.com" style={{ display: "block", fontSize: "0.875rem", color: "#0d7777", textDecoration: "none" }}>vaibhavient@gmail.com</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e6f4f4",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#0d7777",
                      }}
                    >
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>Business Hours</h3>
                      <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                        Monday – Saturday<br />
                        9:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp quick contact */}
              <a
                href="https://wa.me/919820052056"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  padding: "0.875rem 1.25rem",
                  backgroundColor: "#25d366",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Map */}
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div style={{ backgroundColor: "#0d7777", padding: "1.25rem 1.5rem" }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    Our Location
                  </h2>
                </div>
                <div style={{ height: "380px" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d120097.25304285038!2d72.85442096542575!3d19.15874778613096!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b52c85e4f3%3A0x51e9c67107778628!2sVAIBHAVI%20ENTERPRISES!5e1!3m2!1sen!2sin!4v1745247245191!5m2!1sen!2sin"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vaibhavi Enterprises location"
                  />
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0" }}>
                  <a
                    href="https://www.google.com/maps/place/VAIBHAVI+ENTERPRISES"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "#0d7777", fontWeight: 600, textDecoration: "none" }}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .responsive-grid-1 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
