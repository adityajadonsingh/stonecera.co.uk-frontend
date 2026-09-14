"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


interface SelectorProps {
  currentLimit: number;
  currentFilters: Record<string, string>;
  categorySlug: string;
  currentPage: number;
}

const options = [12, 24, 36];

export default function ProductsPerPageSelector({
  currentLimit,
  currentFilters,
  categorySlug,
}: SelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (value: number) => {
    const params = new URLSearchParams(currentFilters);

    if (value === 12) params.delete("limit");
    else params.set("limit", String(value));

    params.delete("page");

    const queryString = params.toString();
    router.push(
      queryString
        ? `/product-category/${categorySlug}?${queryString}`
        : `/product-category/${categorySlug}`
    );

    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-3">
      <span className="text-sm font-medium text-dark whitespace-nowrap">
        Products per page
      </span>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-1
          rounded-lg border border-gray-300
          bg-white px-3 py-1
          text-sm font-semibold text-gray-700
          shadow-xs
          hover:border-[#cb934f]
          focus:outline-none focus:ring-1 focus:ring-[#cb934f]/40
        "
      >
        {currentLimit}
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2 w-32
            rounded-lg border border-gray-200
            bg-white shadow-lg
            overflow-hidden
          "
        >
          {options.map((opt) => {
            const active = opt === currentLimit;

            return (
              <button
                key={opt}
                onClick={() => handleChange(opt)}
                className={`
                  flex w-full items-center justify-between
                  px-4 py-2 text-sm
                  transition
                  ${active
                    ? "bg-[#cb934f]/10 text-[#cb934f] font-semibold"
                    : "hover:bg-gray-100"}
                `}
              >
                {opt}
                {active && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
