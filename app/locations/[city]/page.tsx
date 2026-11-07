import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

type CitySlug = "mumbai" | "pune" | "nashik" | "thane" | "nagpur" | "aurangabad";

interface CityData {
  name: string;
  lat: number;
  lng: number;
  industries: string[];
  intro: string;
}

const CITY_DATA: Record<CitySlug, CityData> = {
  mumbai: {
    name: "Mumbai",
    lat: 19.1587,
    lng: 72.8544,
    industries: ["Chemical Processing", "Pharmaceutical", "Marine & Offshore", "Food & Beverage"],
    intro:
      "Vaibhavi Enterprises serves Mumbai's diverse industrial belt with high-performance fluoropolymer coatings and porous plastic filtration solutions. From chemical processing and pharmaceutical units to marine & offshore operations across the harbor, we support the city's critical industries with durable, compliant surface protection.",
  },
  pune: {
    name: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    industries: ["Automotive", "Manufacturing", "Engineering", "Oil & Gas"],
    intro:
      "Pune's thriving automotive and manufacturing corridor demands precision-engineered surface protection that performs under demanding conditions. Vaibhavi Enterprises delivers PTFE, HALAR (ECTFE), FBE, and fluoropolymer coatings to automotive, manufacturing, engineering, and oil & gas clients across Pune and Chakan.",
  },
  nashik: {
    name: "Nashik",
    lat: 19.9975,
    lng: 73.791,
    industries: ["Pharmaceutical", "Automotive", "Food Processing"],
    intro:
      "Nashik's growing pharmaceutical, automotive, and food processing sectors need coatings that meet strict hygiene and regulatory standards. We provide fluoropolymer coatings and Vaicon porous plastic filters tailored to Nashik's manufacturing and processing industries.",
  },
  thane: {
    name: "Thane",
    lat: 19.2183,
    lng: 72.9781,
    industries: ["Chemical Industry", "Industrial Machinery", "Water Treatment"],
    intro:
      "Thane's chemical industry and industrial machinery manufacturers require corrosion-resistant, chemically inert surface protection. Vaibhavi Enterprises serves Thane's chemical, machinery, and water treatment sectors with proven fluoropolymer coating systems built for long service life.",
  },
  nagpur: {
    name: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    industries: ["Power Generation", "Oil & Gas", "Infrastructure", "Water Treatment"],
    intro:
      "As a power generation, oil & gas, and infrastructure hub, Nagpur demands coatings that withstand extreme temperatures and harsh environments. Vaibhavi Enterprises supports Nagpur's critical infrastructure with high-performance fluoropolymer coatings and porous plastic filtration solutions.",
  },
  aurangabad: {
    name: "Aurangabad",
    lat: 19.8762,
    lng: 75.3433,
    industries: ["Pharmaceutical", "Manufacturing", "Automotive"],
    intro:
      "Aurangabad's pharmaceutical, manufacturing, and automotive industries require reliable surface protection and filtration media. Vaibhavi Enterprises delivers fluoropolymer coatings and Vaicon porous plastic filters to support Aurangabad's expanding industrial base.",
  },
};

const CITIES: CitySlug[] = Object.keys(CITY_DATA) as CitySlug[];

const COMPANY_NAME = "Vaibhavi Enterprises";
const PHONE_NUMBERS = ["+91 98200 52056", "+91 98200 52057", "022-4978 9807"];
const PHONE_TELS = ["+919820052056", "+919820052057", "02249789807"];
const COMPANY_EMAIL = "response@vaibhavientp.com";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d120097.25304285038!2d72.85442096542575!3d19.15874778613096!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1s0x3be7b7b52c85e4f3%3A0x51e9c67107778628!2sVAIBHAVI+ENTERPRISES!5e1!3m2!1sen!2sin!4v1745247245191!5m2!1sen!2sin";
const MAP_PLACE_URL = "https://www.google.com/maps/place/VAIBHAVI+ENTERPRISES";
const SERVICES = [
  "PTFE Coating",
  "HALAR (ECTFE) Coating",
  "FBE Coating",
  "Fluoropolymer Coatings",
  "Vaicon Porous Plastic Filters",
];

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = CITY_DATA[city as CitySlug] ?? CITY_DATA.mumbai;
  const title = `${data.name} Industrial Coating Services | ${COMPANY_NAME}`;
  const description = `${data.intro} Serving ${data.name}'s ${data.industries
    .slice(0, 3)
    .join(", ").toLowerCase()} industries. Request a free quote today.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://vaibhavienterprises.com/locations/${city}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://vaibhavienterprises.com/locations/${city}`,
      siteName: COMPANY_NAME,
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = CITY_DATA[city as CitySlug] ?? CITY_DATA.mumbai;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    image: "https://vaibhavienterprises.com/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "N/3, Cama Industrial Estate, Opp. Jaipan Industries, Walbhat Road",
      addressLocality: "Goregaon (East)",
      addressRegion: "Mumbai, Maharashtra",
      postalCode: "400063",
      addressCountry: "IN",
    },
    telephone: "+919820052056",
    email: COMPANY_EMAIL,
    url: `https://vaibhavienterprises.com/locations/${city}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.lat,
      longitude: data.lng,
    },
    areaServed: data.name,
    hasOfferCatalog: SERVICES,
    openingHours: "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <Image
            src="/logo.png"
            alt={`${COMPANY_NAME} logo`}
            width={40}
            height={40}
            style={{ display: "block", marginBottom: "1rem" }}
          />
          <p
            style={{
              fontSize: "0.8rem",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Locations
          </p>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "#64748b",
              marginBottom: "1rem",
            }}
          >
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
              Home
            </Link>
            <ArrowRight size={14} strokeWidth={1.5} style={{ color: "#94a3b8" }} />
            <span style={{ color: "#64748b" }}>Locations</span>
            <ArrowRight size={14} strokeWidth={1.5} style={{ color: "#94a3b8" }} />
            <span style={{ color: "#1e293b", fontWeight: 600 }}>{data.name}</span>
          </nav>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: "0 0 0.75rem",
            }}
          >
            {data.name} Industrial Coating Services
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "480px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {data.intro}
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
            {/* NAP section */}
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
                    Business Information
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
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
                        Company Name
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                        {COMPANY_NAME}
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
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
                        Address
                      </h3>
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
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
                        Phone
                      </h3>
                      {PHONE_NUMBERS.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${PHONE_TELS[index]}`}
                          style={{
                            display: "block",
                            fontSize: "0.875rem",
                            color: "#64748b",
                            textDecoration: "none",
                            marginBottom: "0.125rem",
                          }}
                        >
                          {phone}
                        </a>
                      ))}
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
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.25rem" }}>
                        Email
                      </h3>
                      <a
                        href={`mailto:${COMPANY_EMAIL}`}
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          color: "#0d7777",
                          textDecoration: "none",
                        }}
                      >
                        {COMPANY_EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map section */}
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
                    Our Location in {data.name}
                  </h2>
                </div>
                <div style={{ height: "380px" }}>
                  <iframe
                    src={MAP_EMBED_URL}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Vaibhavi Enterprises location in ${data.name}`}
                  />
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0" }}>
                  <a
                    href={MAP_PLACE_URL}
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

      {/* Services offered */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <h2
            style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}
          >
            Services Offered in {data.name}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 0 2rem",
            }}
          >
            We provide high-performance fluoropolymer surface coatings and porous plastic filtration media to industries across {data.name}.
          </p>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "1rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {SERVICES.map((service) => (
              <li
                key={service}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                  fontSize: "0.95rem",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#0d7777",
                    fontWeight: 700,
                    marginRight: "0.75rem",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                  }}
                >
                  &bull;
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries served */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <h2
            style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e293b", margin: "0 0 1rem" }}
          >
            Industries Served in {data.name}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 0 2rem",
            }}
          >
            {data.name}&apos;s {data.industries.join(", ").toLowerCase()} sectors rely on Vaibhavi Enterprises for coatings engineered for chemical resistance, thermal stability, and long service life.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {data.industries.map((industry) => (
              <span
                key={industry}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#e6f4f4",
                  border: "1px solid #bfe3e3",
                  color: "#0d7777",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Quote CTA */}
      <section style={{ padding: "4rem 0", backgroundColor: "#0d7777" }}>
        <div
          className="container"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.75rem" }}
          >
            Request a Quote for {data.name}
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem", margin: "0 0 2rem" }}>
            Get a free consultation for industrial coating solutions in {data.name}.
          </p>
          <Link
            href="/enquiry"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#0d7777",
              color: "#ffffff",
              padding: "0.625rem 1.375rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Request a Quote <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <style>{`
        @media (max-width: 767px) {
          .responsive-grid-1 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
