"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function AIChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the Vaibhavi Enterprises assistant. Ask me about our coatings, filters, or request a quote.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (pathname.startsWith("/admin")) return null;

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runSendMessage();
  };

  async function runSendMessage() {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Sorry, I couldn't respond." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Unable to connect. Please email response@vaibhavientp.com." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 1000, fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "relative",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#0d7777",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(13,119,119,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MessageCircle size={22} />
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            right: 0,
            width: "360px",
            height: "520px",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#0d7777",
              color: "#ffffff",
              padding: "0.9rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <MessageCircle size={16} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Vaibhavi Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div
            style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "82%",
                }}
              >
                <div
                  style={{
                    padding: "0.65rem 0.9rem",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    backgroundColor: msg.role === "user" ? "#0d7777" : "#f1f5f9",
                    color: msg.role === "user" ? "#ffffff" : "#1e293b",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", maxWidth: "82%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 0.9rem", backgroundColor: "#f1f5f9", borderRadius: "10px", color: "#64748b", fontSize: "0.9rem" }}>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} style={{ padding: "0.75rem 1rem", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "0.65rem 0.9rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  padding: "0.65rem 0.9rem",
                  backgroundColor: loading || !input.trim() ? "#cbd5e1" : "#0d7777",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
