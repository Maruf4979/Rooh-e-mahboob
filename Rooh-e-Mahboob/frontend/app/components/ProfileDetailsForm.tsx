"use client";

import { useState } from "react";
import { useSession } from "../context/AuthContext";

export default function ProfileDetailsForm({ initialName }: { initialName: string }) {
  const { updateUser } = useSession();
  const [name, setName] = useState(initialName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      updateUser({ name });
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("An error occurred while updating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "1.25rem", background: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--outline-variant)" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="name" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--on-surface)" }}>Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--outline)", background: "var(--surface)", color: "var(--on-surface)", width: "100%", maxWidth: "400px" }}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          {message && <span style={{ fontSize: "0.85rem", color: message.includes("success") ? "green" : "var(--error)" }}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
