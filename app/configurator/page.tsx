import { Metadata } from "next";
import ConfiguratorForm from "./ConfiguratorForm";

export const metadata: Metadata = {
  title: "Coating Selector | Vaibhavi Enterprises",
  description:
    "Find the right coating for your application. Select substrate, environment, and temperature to get a personalized coating recommendation from Vaibhavi Enterprises.",
};

export default function ConfiguratorPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <ConfiguratorForm />
    </div>
  );
}