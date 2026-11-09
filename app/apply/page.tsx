import { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Become an Authorized Applicator | Vaibhavi Enterprises",
  description:
    "Apply to become an authorized Vaibhavi applicator/distributor for PTFE, HALAR, FBE coatings and Vaicon filters in Maharashtra. Partner with us for certified coating solutions.",
};

export default function ApplyPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <ApplyForm />
    </div>
  );
}