"use client";

import Image from "next/image";
import ContactImg from "../../../public/media/anthracite-grey-2.webp";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

interface Props {
  page: string; // "homepage" | "contact-us"
}

export default function ContactForm({ page }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, page }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(json?.message || "Something went wrong", "error");
      return;
    }

    showToast("Thank you! We'll get back to you shortly.", "success");
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    });
  };

  return (
    <section className="contact-form py-16">
      <div className="container">
        <div className="grid bg-skin rounded-md grid-cols-1 lg:grid-cols-2">
          <div className="sm:p-10 p-5">
            <h2 className="heading mb-3 text-3xl font-bold">Get In Touch</h2>
            <p className="mb-5">
              We&apos;d love to hear from you! Fill the form below.
            </p>

            <form onSubmit={submit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 bg-white rounded-md"
                required
              />

              <input
                placeholder="Your Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 bg-white rounded-md"
                required
              />

              <input
                placeholder="Your Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 bg-white rounded-md"
                required
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 bg-white rounded-md"
                required
              />

              <button
                disabled={loading}
                className="button-logo-1 py-2 px-6 rounded-md disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <Image
              src={ContactImg}
              alt="Contact Us"
              fill
              className="object-cover rounded-r-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
