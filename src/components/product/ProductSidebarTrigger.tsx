"use client";

import { useState } from "react";
import { ChevronRight, Truck, FileText } from "lucide-react";
import ProductSidebar from "./ProductSidebar";

interface Props {
  description?: string;
}

export default function ProductSidebarTrigger({ description }: Props) {
  const [open, setOpen] = useState<null | "description" | "delivery">(null);

  return (
    <>
      {/* Buttons list */}
      <div className="bg-gray-50 rounded-sm overflow-hidden mt-6">
        {/* DESCRIPTION */}
        {description && (
          <button
            onClick={() => setOpen("description")}
            className="w-full cursor-pointer flex items-center justify-between px-4 py-4 hover:bg-[#f7f3eb] text-[#4a3a2a]"
          >
            <span className="flex items-center gap-2 font-medium text-lg">
              <FileText size={20} />
              Description
            </span>
            <ChevronRight />
          </button>
        )}

        {/* DELIVERY */}
        <button
          onClick={() => setOpen("delivery")}
          className="w-full cursor-pointer border-t border-gray-200 flex items-center justify-between px-4 py-4 hover:bg-[#f7f3eb] text-[#4a3a2a]"
        >
          <span className="flex items-center gap-2 font-medium text-lg">
            <Truck size={20} />
            Delivery{" "}
            <span className="text-gray-400 font-normal text-xs">
              (Check for Free Delivery)
            </span>
          </span>
          <ChevronRight />
        </button>
      </div>

      {/* SIDEBAR */}
      <ProductSidebar
        open={open === "description"}
        title="Description"
        content={description}
        onClose={() => setOpen(null)}
      />

      <ProductSidebar
        open={open === "delivery"}
        title="Delivery"
        content={`<div className="space-y-4">
      <p>
        Enter your postcode to check delivery availability and pricing.
      </p>

      <div className="space-y-2">
        <p className="font-medium">🚚 Delivery Information:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Free delivery is available in many UK mainland areas</li>
          <li>A small surcharge may apply depending on your location</li>
          <li>Remote areas may have higher delivery charges</li>
          <li>Kerbside delivery via pallet network</li>
          <li>Delivery usually within 2–4 working days</li>
          <li>Please ensure access for large delivery vehicles</li>
        </ul>
      </div>

      <p className="text-gray-500 text-xs">
        * Delivery charges and times may vary depending on postcode and product type.
      </p>
    </div>`}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
