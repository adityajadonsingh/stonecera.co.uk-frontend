"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  currentLimit: number;
  currentFilters: Record<string, string>;
}

const options = [12, 24, 36];

export default function ProductsPerPageSelectorProducts({
  currentLimit,
  currentFilters,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (value: number) => {
    const params = new URLSearchParams();

    // copy only valid primitive filters
    Object.entries(currentFilters).forEach(([k, v]) => {
      if (typeof v === "string") params.set(k, v);
    });

    if (value === 12) params.delete("limit");
    else params.set("limit", String(value));

    params.delete("page");

    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : `/products`);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-3">
      <span className="text-sm font-medium text-dark whitespace-nowrap">
        Products per page
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-semibold"
      >
        {currentLimit}
        <ChevronDown size={16} className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-32 rounded-lg border bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleChange(opt)}
              className={`flex w-full justify-between px-4 py-2 text-sm ${
                opt === currentLimit
                  ? "bg-[#cb934f]/10 text-[#cb934f] font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {opt}
              {opt === currentLimit && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
