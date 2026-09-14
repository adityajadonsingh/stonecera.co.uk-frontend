"use client";

import { Truck, Heart, RefreshCcw, BadgeEuro, Gem, HeartHandshake } from "lucide-react";

export default function ProductHighlights() {
  return (
    <div className="border-y border-gray-200 py-4 px-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-4 sm:text-sm text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <Truck className="sm:w-8 w-6 sm:h-8 h-6 text-[#ca924e]" />
          <span className="font-semibold text-[#4c4331]">
            Free Delivery<span className="text-xs align-super">*</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Gem className="sm:w-8 w-6 sm:h-8 h-6 text-[#ca924e]" />
          <span className="font-semibold text-[#4c4331]">Quality Guaranteed</span>
        </div>
        <div className="flex items-center gap-2">
          <BadgeEuro className="sm:w-8 w-6 sm:h-8 h-6 text-[#ca924e]" />
          <span className="font-semibold text-[#4c4331]">Best in Price</span>
        </div>
        <div className="flex items-center gap-2">
          <HeartHandshake className="sm:w-8 w-6 sm:h-8 h-6 text-[#ca924e]" />
          <span className="font-semibold text-[#4c4331]">Customer Satisfaction</span>
        </div>
      </div>
    </div>
  );
}
