"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { getClientInfo } from "@/utils/getClientInfo";
import { Mail, MessageCircleQuestionMark, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "../../../public/media/icons/whatsapp.png";
import { Turnstile } from "react-turnstile";
export default function NeedHelpBox({ pageName }: { pageName: string }) {
  const { showToast } = useToast();
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
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

    const clientInfo = await getClientInfo();

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        page: pageName,
        client_ip: clientInfo?.ip,
        country_code: clientInfo?.country,
        captchaToken: token
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(json?.message || "Something went wrong", "error");
      return;
    }

    showToast("Thank you! We'll get back to you shortly.", "success");

    // reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    });

    setOpen(false);
  };

  return (
    <>
      <div className="need-help-section border-2 rounded-sm border-gray-200 text-center sm:px-5 px-3 py-2 mt-5">
        <span className="block heading font-bold text-xl mb-4">
          Need Help ?
        </span>
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-2 sm:gap-4 gap-2 mb-2 justify-center">
          <Link href={`tel:+441234567890`} title="Call Us">
            <button className="col cursor-pointer w-full sm:p-4 p-2 shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center xl:gap-x-3 gap-x-2">
              <Phone size={20} />{" "}
              <span className="font-medium sm:text-base text-sm">Call Us</span>
            </button>
          </Link>
          <Link href={`mailto:info@stonecera.co.uk`} title="Mail Us">
            <button className="col cursor-pointer w-full sm:p-4 p-2 shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center xl:gap-x-3 gap-x-2">
              <Mail size={20} />{" "}
              <span className="font-medium sm:text-base text-sm">Mail Us</span>
            </button>
          </Link>
          <Link
            href={`https://wa.me/+447467648124`}
            title="WhatsApp Us your query"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="col cursor-pointer w-full sm:p-4 p-2 shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center xl:gap-x-3 gap-x-2">
              <Image src={WhatsAppIcon} alt="WhatsApp" width={25} height={25} />{" "}
              <span className="font-medium sm:text-base text-sm">
                WhatsApp Us
              </span>
            </button>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="col cursor-pointer w-full sm:p-4 p-2 shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center xl:gap-x-3 gap-x-2"
          >
            <MessageCircleQuestionMark size={20} />
            <span className="font-medium sm:text-base text-sm">Message Us</span>
          </button>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-skin w-[95%] sm:w-[500px] rounded-md p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute cursor-pointer text-lg font-medium top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h4 className="pr-3 font-semibold mb-4">
              Send us your query, and we will get back to you shortly.
            </h4>

            <form onSubmit={submit} className="space-y-3">
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
                className="w-full p-3 rounded-md bg-white"
                required
              />

              <input
                placeholder="Your Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-md bg-white"
                required
              />

              <input
                placeholder="Your Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 rounded-md bg-white"
                required
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-md bg-white"
                required
              />

              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                theme="light"
                onVerify={(token) => setToken(token)}
              />

              <button
                disabled={loading || !token}
                className="w-full button-1 cursor-pointer text-white py-2 rounded disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
