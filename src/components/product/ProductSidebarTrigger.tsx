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
            Delivery <span className="text-gray-400 font-normal text-xs">(Check for Free Delivery)</span>
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
        content={`
          <p><strong>Free delivery</strong> available on all UK mainland orders.</p>
          <p>Delivery usually takes <strong>3–5 working days</strong>.</p>
          <p>You will be contacted prior to delivery to arrange a suitable time.</p>
        `}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
