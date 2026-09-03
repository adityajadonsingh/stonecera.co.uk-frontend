"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

import { useToast } from "@/components/ui/ToastProvider";
import { getClientInfo } from "@/utils/getClientInfo";

interface Props {
  page: string; // "homepage" | "contact-us"
}

export default function ContactForm({ page }: Props) {
  const { showToast } = useToast();

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!token) {
    showToast("Please complete the security verification.", "error");
    return;
  }

  setLoading(true);

  try {
    const clientInfo = await getClientInfo();

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${form.first_name} ${form.last_name}`.trim(),
        email: form.email,
        phone: form.phone,

        // Subject is included inside the existing message field
        message: `Subject: ${form.subject}\n\n${form.message}`,

        page,
        client_ip: clientInfo?.ip,
        country_code: clientInfo?.country,
        captchaToken: token,
        website: form.website,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      showToast(json?.message || "Something went wrong", "error");
      return;
    }

    showToast(
      "Thank you! We'll get back to you shortly.",
      "success"
    );

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "",
    });

    setToken("");
  } catch (error) {
    console.error("Contact form submission error:", error);

    showToast(
      "Unable to send your message. Please try again.",
      "error"
    );
  } finally {
    setLoading(false);
  }
};

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* =========================
              LEFT - CONTACT DETAILS
          ========================== */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-[#262a18]">
              Get in Touch
            </h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className=" bg-[#99a14e]/10 p-3 text-[#99a14e]">
                  <Phone className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#262a18]">
                    Phone
                  </h3>

                  <p className="text-stone-600">
                    +44 (0) 123 456 7890
                  </p>

                  <p className="text-sm text-stone-400">
                    Mon-Fri: 8am - 6pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className=" bg-[#99a14e]/10 p-3 text-[#99a14e]">
                  <Mail className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#262a18]">
                    Email
                  </h3>

                  <p className="text-stone-600">
                    sales@premiumstone.co.uk
                  </p>

                  <p className="text-stone-600">
                    support@premiumstone.co.uk
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className=" bg-[#99a14e]/10 p-3 text-[#99a14e]">
                  <MapPin className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#262a18]">
                    Showroom Address
                  </h3>

                  <p className="text-stone-600">
                    123 Stone Paving Way,
                    <br />
                    Design District,
                    <br />
                    London, SW1A 1AA
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className=" bg-[#99a14e]/10 p-3 text-[#99a14e]">
                  <Clock className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#262a18]">
                    Working Hours
                  </h3>

                  <p className="text-stone-600">
                    Monday - Friday: 08:30 - 17:30
                  </p>

                  <p className="text-stone-600">
                    Saturday: 09:00 - 13:00
                  </p>

                  <p className="text-sm italic text-stone-400">
                    Closed on Sundays &amp; Bank Holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-12 h-[300px] overflow-hidden rounded-2xl border border-stone-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5404231560943!2d-0.127758284230232!3d51.50735087963597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c3216379de%3A0x69dd443f114c0228!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1625123456789!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Stonecera showroom location"
              />
            </div>
          </div>

          {/* =========================
              RIGHT - FORM
          ========================== */}
          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-xl md:p-10">
            <h2 className="mb-6 text-2xl font-bold text-[#262a18]">
              Send us a Message
            </h2>

            <form onSubmit={submit} className="space-y-6">
              {/* Honeypot */}
              <input
                type="text"
                value={form.website}
                onChange={(e) =>
                  updateField("website", e.target.value)
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* First + Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="first_name"
                    className="text-sm font-medium text-[#262a18]"
                  >
                    First Name
                  </label>

                  <input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    value={form.first_name}
                    onChange={(e) =>
                      updateField("first_name", e.target.value)
                    }
                    className="h-10 w-full  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                    required
                    autoComplete="given-name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="last_name"
                    className="text-sm font-medium text-[#262a18]"
                  >
                    Last Name
                  </label>

                  <input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    value={form.last_name}
                    onChange={(e) =>
                      updateField("last_name", e.target.value)
                    }
                    className="h-10 w-full  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#262a18]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  className="h-10 w-full  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-[#262a18]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+44 7123 456789"
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  className="h-10 w-full  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                  required
                  autoComplete="tel"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-[#262a18]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  className="h-10 w-full  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[#262a18]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us about your project or enquiry..."
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  className="min-h-[150px] w-full resize-y  border border-[#262a18]/15 bg-[#faf8f5] px-3 py-2 text-sm text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
                  required
                />
              </div>

              {/* Turnstile */}
              <div className="origin-left scale-90 sm:scale-100">
                <Turnstile
                  sitekey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                  }
                  theme="light"
                  refreshExpired="auto"
                  onVerify={(token) => setToken(token)}
                  onExpire={() => setToken("")}
                  onError={() => setToken("")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !token}
                className="flex h-12 w-full items-center justify-center  bg-[#262a18] px-4 text-lg font-medium text-white transition-colors hover:bg-[#4a5530] disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}