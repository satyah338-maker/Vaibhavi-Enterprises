"use client";

import { useEffect, useState } from "react";
import ClientForm from "../ClientForm";

type Client = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  industry: string;
  status: string;
};

export default function EditClientPage() {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/clients");
        const data: Client[] = await res.json();
        const id = window.location.pathname.split("/").pop();
        setClient(data.find((c) => c.id === id) || null);
      } catch {
        setClient(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading client...</div>;
  if (!client) return <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Client not found.</div>;

  return <ClientForm mode="edit" client={client} />;
}
