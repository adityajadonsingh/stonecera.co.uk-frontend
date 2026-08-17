"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { getClientInfo } from "@/utils/getClientInfo";
import Turnstile from "react-turnstile";

interface Props {
  page: string; // "homepage" | "contact-us"
}

export default function ContactSection({ page }: Props) {
  const { showToast } = useToast();

  const [token, setToken] = useState("");

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
          ...form,
          page,
          client_ip: clientInfo?.ip,
          country_code: clientInfo?.country,
          captchaToken: token,
        }),
      });

      const json = await res.json();

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

      setToken("");
    } catch (error) {
      console.error("Contact form error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-sans font-bold text-[#99a14e]">
              Get in Touch
            </p>

            <h2 className="text-5xl lg:text-7xl leading-[1.1] mb-10 text-[#262a18]">
              Plan your <em>dream</em>
              <br />
              outdoor space.
            </h2>

            <p className="text-lg text-stone-600 leading-relaxed mb-12 max-w-lg">
              Have questions about our stone varieties or need a custom quote
              for a large project? Our specialists are here to help you choose
              the perfect material for your home.
            </p>

            {/* CONTACT DETAILS */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                  Direct Lines
                </h4>

                <p className="text-xl font-medium text-[#262a18]">
                  44 333 242 0255
                </p>

                <p className="text-sm text-stone-500">
                  Mon-Fri: 8:00am - 6:00pm
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                  Email Support
                </h4>

                <p className="text-xl font-medium text-[#262a18]">
                  info@stonecera.co.uk
                </p>

                <p className="text-sm text-stone-500">
                  Average response time: 2 hours
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#f9f7f3] p-8 lg:p-12 shadow-xl">
            <form onSubmit={submit} className="space-y-6">
              {/* Honeypot */}
              <input
                type="text"
                value={form.website}
                onChange={(e) =>
                  setForm({
                    ...form,
                    website: e.target.value,
                  })
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* NAME */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#262a18]">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-white border-b border-stone-200 p-3 text-sm focus:outline-none focus:border-[#d8c06a] transition-colors"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#262a18]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="example@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-white border-b border-stone-200 p-3 text-sm focus:outline-none focus:border-[#d8c06a] transition-colors"
                  required
                />
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#262a18]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="0800 123 4567"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-white border-b border-stone-200 p-3 text-sm focus:outline-none focus:border-[#d8c06a] transition-colors"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#262a18]">
                  Message
                </label>

                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="w-full bg-white border-b border-stone-200 p-3 text-sm focus:outline-none focus:border-[#d8c06a] transition-colors resize-none"
                  required
                />
              </div>

              {/* CLOUDFLARE TURNSTILE */}
              <div className="pt-1">
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  theme="light"
                  refreshExpired="auto"
                  onVerify={(token) => setToken(token)}
                  onExpire={() => setToken("")}
                  onError={() => setToken("")}
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-5 bg-[#262a18] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#323821] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </button>

              {/* PRIVACY */}
              <p className="text-[9px] text-stone-400 text-center uppercase tracking-widest">
                By submitting, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}