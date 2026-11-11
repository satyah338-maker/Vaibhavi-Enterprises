import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Vaibhavi Enterprises – Fluoropolymer Coatings & Porous Plastic Filters",
  description:
    "Since 1989, Vaibhavi Enterprises has been a leader in fluoropolymer (Viflon) surface coatings and Vaicon porous plastic filter media for pharmaceutical, chemical, and industrial applications. Mumbai, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <WhatsAppButton />
          <AIChatbot />
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  );
}
