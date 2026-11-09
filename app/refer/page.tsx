import { Metadata } from "next";
import ReferralForm from "./ReferralForm";

export const metadata: Metadata = {
  title: "Refer a Colleague | Vaibhavi Enterprises",
  description:
    "Refer a colleague or business to Vaibhavi Enterprises and earn rewards. Help others discover certified PTFE, HALAR, FBE coatings and Vaicon filters.",
};

export default function ReferralPage() {
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
            Refer a Colleague
          </h1>
          <p className="section-subheading" style={{ marginBottom: 0 }}>
            Help fellow manufacturers discover certified PTFE, HALAR, FBE
            coatings and Vaicon porous plastic filters. Earn rewards for
            every successful referral.
          </p>
        </div>
      </div>

      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "3rem",
              alignItems: "flex-start",
            }}
          >
            <ReferralForm />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
          section > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}