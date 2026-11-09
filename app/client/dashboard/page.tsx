import { Metadata } from "next";
import DashboardForm from "./DashboardForm";

export const metadata: Metadata = {
  title: "Client Dashboard | Vaibhavi Enterprises",
  description:
    "Track your orders, reorder coatings, and download certificates. Client portal for Vaibhavi Enterprises customers.",
};

export default function ClientDashboardPage() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <DashboardForm />
    </div>
  );
}