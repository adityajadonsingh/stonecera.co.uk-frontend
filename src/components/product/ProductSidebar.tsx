"use client";

import { X, Truck, FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  title: string;
  content?: string; // CKEditor HTML for description OR static delivery text
  onClose: () => void;
}

export default function ProductSidebar({
  open,
  title,
  content,
  onClose,
}: Props) {
  /* ---------- DELIVERY STATE ---------- */
  const isDelivery = title.toLowerCase() === "delivery";

  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prices, setPrices] = useState<{
    economy_price: string;
    premium_price: string;
  } | null>(null);

  /* ---------- ESC KEY + BODY SCROLL LOCK ---------- */
  useEffect(() => {
    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  /* ---------- DELIVERY CHECK ---------- */
  const checkDelivery = async () => {
    if (!pincode.trim()) {
      setError("Please enter a valid postcode");
      return;
    }

    setLoading(true);
    setError(null);
    setPrices(null);

    try {
      const res = await fetch(
        `/api/delivery/${encodeURIComponent(pincode)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Delivery not available");
      }

      setPrices({
        economy_price: data.economy_price,
        premium_price: data.premium_price,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-80 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-90 shadow-xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 text-[#4a3a2a] py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {isDelivery ? <Truck size={24} /> : <FileText size={24} />}
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto text-sm leading-relaxed text-gray-700 space-y-6">
          {/* ---------- DELIVERY PINCODE CHECK ---------- */}
          {isDelivery && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Enter your postcode to check delivery availability and prices.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.toUpperCase())
                  }
                  placeholder="e.g. AB1 0AA"
                  className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#cc9450]"
                />

                <button
                  onClick={checkDelivery}
                  disabled={loading}
                  className="bg-[#cc9450] hover:bg-[#4c4331] text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                >
                  {loading ? "Checking…" : "Check"}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}

              {prices && (
                <div className="border rounded p-4 space-y-2 bg-gray-50">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      Economy Delivery
                    </span>
                    <span className="font-semibold">
                      £{Number(prices.economy_price).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      Premium Delivery
                    </span>
                    <span className="font-semibold">
                      £{Number(prices.premium_price).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------- STATIC / CKEDITOR CONTENT ---------- */}
          {content ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-gray-400 italic">
              No information available.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
