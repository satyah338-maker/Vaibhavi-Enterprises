import { Metadata } from "next";
import Link from "next/link";
import TrackQuoteForm from "./TrackQuoteForm";

export const metadata: Metadata = {
  title: "Track Your Enquiry | Vaibhavi Enterprises",
  description:
    "Track the status of your coating or filter enquiry. Enter your quote number to get real-time updates from Vaibhavi Enterprises, Mumbai.",
};

export default function TrackQuotePage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "3rem 0 2.5rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container">
          <div className="accent-line" />
          <h1
            className="section-heading"
            style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
          >
            Track Your Enquiry
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Enter your quote number to check the status of your coating or
            filter enquiry. New customers can{" "}
            <Link href="/enquiry">request a quote here</Link>.
          </p>
        </div>
      </div>

      <TrackQuoteForm />

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>
    </div>
  );
}