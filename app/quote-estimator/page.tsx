import { Metadata } from "next";
import QuoteEstimatorForm from "./QuoteEstimatorForm";

export const metadata: Metadata = {
  title: "Instant Quote Estimator | Vaibhavi Enterprises",
  description:
    "Get a ballpark coating cost estimate. Select coating type, surface area, and thickness for an instant price range from Vaibhavi Enterprises, Mumbai.",
};

export default function QuoteEstimatorPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <QuoteEstimatorForm />
    </div>
  );
}