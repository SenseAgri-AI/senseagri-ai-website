"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Button from "@/components/Button";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  province: string;
  farmType: string;
  birdCount: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  province: "",
  farmType: "",
  birdCount: "",
  message: ""
};

// Shared input class: no four-sided box, surface tonal bg + 2px bottom stroke
const inputClass =
  "mt-2 input-field";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = () => {
    if (!formData.name || !formData.company || !formData.email || !formData.message) {
      return "Please complete the required fields.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please provide a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      setStatus("success");
      setFormData(initialState);
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please email us directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Name *
          <input className={inputClass} value={formData.name} onChange={updateField("name")} required />
        </label>
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Company *
          <input className={inputClass} value={formData.company} onChange={updateField("company")} required />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Email *
          <input className={inputClass} type="email" value={formData.email} onChange={updateField("email")} required />
        </label>
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Phone / WhatsApp
          <input className={inputClass} value={formData.phone} onChange={updateField("phone")} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Province
          <input className={inputClass} value={formData.province} onChange={updateField("province")} />
        </label>
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Farm type
          <select className={inputClass} value={formData.farmType} onChange={updateField("farmType")}>
            <option value="">Select</option>
            <option value="Broiler">Broiler</option>
            <option value="Layer">Layer</option>
            <option value="Mixed">Mixed</option>
          </select>
        </label>
        <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
          Bird count range
          <select className={inputClass} value={formData.birdCount} onChange={updateField("birdCount")}>
            <option value="">Select</option>
            <option value="<25k">Below 25k</option>
            <option value="25k-100k">25k – 100k</option>
            <option value="100k-300k">100k – 300k</option>
            <option value="300k+">300k+</option>
          </select>
        </label>
      </div>

      <label className="font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">
        Message *
        <textarea
          className={`${inputClass} min-h-[140px] resize-none`}
          value={formData.message}
          onChange={updateField("message")}
          required
        />
      </label>

      {status === "error" && error ? (
        <p className="font-sans text-title-sm text-tertiary">{error}</p>
      ) : null}
      {status === "success" ? (
        <p className="font-sans text-title-sm text-primary">
          Thanks, we will get back to you within one business day.
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button>{status === "loading" ? "Sending…" : "Send enquiry"}</Button>
        <p className="font-label text-label-md text-outline-variant">
          We only use your details to respond to your request.
        </p>
      </div>
    </form>
  );
}
