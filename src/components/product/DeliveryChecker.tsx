"use client";

import { useState } from "react";
import { MapPin, Truck } from "lucide-react";

export default function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [prices, setPrices] = useState<{
    economy_price: string;
    premium_price: string;
  } | null>(null);

  const checkDelivery = async () => {
    const postcode = pincode.trim();

    if (!postcode) {
      setError("Please enter a valid postcode");
      setPrices(null);
      return;
    }

    setLoading(true);
    setError(null);
    setPrices(null);

    try {
      const res = await fetch(
        `/api/delivery/${encodeURIComponent(postcode)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Delivery not available");
      }

      setPrices({
        economy_price: data.economy_price,
        premium_price: data.premium_price,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-white/5 pb-1 pt-2">
      {/* Delivery heading */}
      <div className="mb-2 flex items-center gap-2">
        <Truck size={14} className="text-[#a67c52]" />

        <span className="text-[11px] font-bold uppercase tracking-wide">
          Free Mainland UK Delivery
        </span>
      </div>

      {/* Postcode input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.toUpperCase());

              // Clear previous result/error when user edits postcode
              if (error) setError(null);
              if (prices) setPrices(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkDelivery();
              }
            }}
            placeholder="Postcode"
            className="
              h-9
              w-full
              rounded
              border
              border-white/10
              bg-white/5
              pl-8
              pr-3
              text-[12px]
              text-white
              outline-none
              transition-colors
              placeholder:text-gray-600
              focus:border-[#a67c52]
            "
          />
        </div>

        <button
          type="button"
          onClick={checkDelivery}
          disabled={loading || !pincode.trim()}
          className="
            h-9
            rounded
            bg-[#a67c52]
            px-3
            text-[11px]
            font-bold
            text-white
            transition-colors
            hover:bg-[#c19262]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "CHECKING…" : "CHECK"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-[11px] font-medium text-red-400">
          {error}
        </p>
      )}

      {/* Delivery prices */}
      {prices && (
        <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-gray-300">
              Economy Delivery
            </span>

            <span className="font-bold text-white">
              £{Number(prices.economy_price).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-gray-300">
              Premium Delivery
            </span>

            <span className="font-bold text-white">
              £{Number(prices.premium_price).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}