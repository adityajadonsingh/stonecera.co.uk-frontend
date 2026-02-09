"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FilterCounts } from "@/lib/types";
import { useTransition, useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { formatFilterLabel } from "@/lib/formatters";

interface FiltersProps {
  currentFilters: Record<string, string>;
  categorySlug: string;
  filterCounts: FilterCounts;
}

const COLOR_MAP: Record<string, string> = {
  Beige: "#ddb87c",
  Black: "#5b5b5b",
  Blue: "#208bc9",
  Bronze: "#CD7F32",
  Brown: "#bf8539",
  Cream: "#f2dcab",
  Golden: "#ccbc6e",
  Green: "#1b6d04",
  Grey: "#a8a8a8",
  Mint: "#d8d39e",
  Multi: "#ed8c63",
  Red: "#dd3333",
  Silver: "#939393",
  White: "#e2e2e2",
  Yellow: "#c6c007",
};

export default function Filters({
  currentFilters,
  categorySlug,
  filterCounts,
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleChange = (filterName: string, value: string) => {
    const paramObj: Record<string, string> = {};

    for (const [key, val] of searchParams.entries()) {
      paramObj[key] = val;
    }

    if (paramObj[filterName] === value) {
      delete paramObj[filterName];
    } else {
      paramObj[filterName] = value;
    }

    delete paramObj.page;

    const sortedQuery = new URLSearchParams(
      Object.entries(paramObj).sort(([a], [b]) => a.localeCompare(b))
    ).toString();

    const targetUrl = `/product-category/${categorySlug}${
      sortedQuery ? `?${sortedQuery}` : ""
    }`;

    startTransition(() => {
      router.push(targetUrl, { scroll: false });
      router.refresh();
    });

    // Close drawer on mobile after applying filter
    setOpen(false);
  };

  const renderColorFilter = (
    fieldName: string,
    data: Record<string, number>
  ) => {
    const entries = Object.entries(data || {});
    if (!entries.some(([, count]) => count > 0)) return null;

    return (
      <div className="mb-4 bg-white py-2">
        <div className="border-[#cb934f]/40 border-b-2 mb-2 px-4 pb-1">
          <span className="font-semibold text-base">Color & Tone</span>
        </div>

        {entries.map(([name, count]) => {
          if (count === 0) return null;
          const checked = currentFilters[fieldName] === name;
          const color = COLOR_MAP[name] || "#ccc";

          return (
            <label
              key={name}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(fieldName, name)}
                className="absolute opacity-0 pointer-events-none"
              />

              <span
                className="h-5 w-5 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: color }}
              />

              <span
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  checked
                    ? "bg-[#cb934f] border-[#cb934f]"
                    : "bg-white border-gray-300"
                }`}
              >
                {checked && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>

              <span className="flex-1 capitalize">
                {name} <span className="text-gray-500">({count})</span>
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  const renderFilter = (
    title: string,
    fieldName: string,
    data: Record<string, number>
  ) => {
    const entries = Object.entries(data || {});
    if (!entries.length) return null;

    return (
      <div className="mb-4 bg-white py-2">
        <div className="border-[#cb934f]/40 border-b-2 mb-2 px-4 pb-1">
          <span className="font-semibold text-base">{title}:</span>
        </div>

        {entries.map(([name, count]) => {
          if (count === 0) return null;
          const checked = currentFilters[fieldName] === name;

          return (
            <label
              key={name}
              className="flex items-start gap-3 px-4 py-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(fieldName, name)}
                className="absolute opacity-0 pointer-events-none"
              />

              <span
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                  checked
                    ? "bg-[#cb934f] border-[#cb934f]"
                    : "bg-white border-gray-300"
                }`}
              >
                {checked && (
                  <Check size={14} strokeWidth={3} className="text-white" />
                )}
              </span>

              <span className="leading-relaxed">
                {title === "Price" && name.includes("-")
                  ? `£${name.replace("-", " - £")}`
                  : formatFilterLabel(fieldName, name)}{" "}
                <span className="text-gray-500">({count})</span>
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-start relative">
        <button
          onClick={() => setOpen(true)}
          className="absolute top-[-3px] flex cursor-pointer items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-[#f7f3eb] text-sm font-medium"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-80 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={`
          fixed lg:h-fit h-full inset-y-0 right-0 z-90 w-[85%] max-w-sm
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}

          bg-skin
          rounded-none lg:rounded-sm
          py-4 px-5
          mb-8

          lg:static lg:translate-x-0 lg:w-auto
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block font-bold text-lg mb-4">Filters</h2>

        <div className="overflow-y-auto lg:h-fit h-full lg:pb-0 pb-24">
          {renderFilter("Price", "price", filterCounts.price)}
          {renderColorFilter("colorTone", filterCounts.colorTone)}
          {renderFilter("Finish", "finish", filterCounts.finish)}
          {renderFilter("Thickness", "thickness", filterCounts.thickness)}
          {renderFilter("Size", "size", filterCounts.size)}
          {renderFilter("Pcs", "pcs", filterCounts.pcs)}
          {renderFilter("Pack Size", "packSize", filterCounts.packSize)}
        </div>
      </aside>
    </>
  );
}
