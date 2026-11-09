"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";
import React from "react";

const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
};

interface LanguageSelectorProps {
  style?: React.CSSProperties;
}

export default function LanguageSelector({ style }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()!;

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <button
        onClick={() => {
          const next: Language =
            language === "en" ? "hi" : language === "hi" ? "mr" : "en";
          setLanguage(next);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          padding: "0.4rem 0.875rem",
          fontSize: "0.85rem",
          color: "#1e293b",
          cursor: "pointer",
        }}
      >
        <Globe size={16} />
        <span>{LANGUAGE_LABELS[language]}</span>
      </button>
    </div>
  );
}