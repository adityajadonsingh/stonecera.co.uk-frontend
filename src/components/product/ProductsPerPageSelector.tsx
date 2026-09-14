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
        : `/product-category/${categorySlug}`,
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
    <div
      ref={ref}
      className="relative w-fit hidden items-center gap-2 sm:flex font-sans"
    >
      <span className="text-[12px] font-semibold text-[rgb(153,161,78)]">
        Products per page
      </span>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          appearance-none flex gap-x-1 cursor-pointer border border-[#262a18]/20 bg-white py-2 px-3 text-xs font-sans text-[#262a18]
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
           border border-[#262a18]/20
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
                  cursor-pointer
                  transition
                  ${
                    active
                      ? "bg-[#cb934f]/10 text-[#cb934f] font-semibold"
                      : "hover:bg-[#f5f0e8]"
                  }
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
