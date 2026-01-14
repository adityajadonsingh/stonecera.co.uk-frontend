"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FilterCounts } from "@/lib/types";
import { useTransition } from "react";
import { Check } from "lucide-react";
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

  // Handles toggle of a filter (keeps all others in URL)
  const [isPending, startTransition] = useTransition();

  const handleChange = (filterName: string, value: string) => {
    // 1. Convert to plain object
    const paramObj: Record<string, string> = {};

    for (const [key, val] of searchParams.entries()) {
      paramObj[key] = val;
    }

    // 2. Toggle filter
    if (paramObj[filterName] === value) {
      delete paramObj[filterName];
    } else {
      paramObj[filterName] = value;
    }

    // 3. Always reset pagination
    delete paramObj.page;

    // 4. Sort keys BEFORE creating query string
    const sortedQuery = new URLSearchParams(
      Object.entries(paramObj).sort(([a], [b]) => a.localeCompare(b))
    ).toString();

    // 5. Build URL
    const targetUrl = `/product-category/${categorySlug}${
      sortedQuery ? `?${sortedQuery}` : ""
    }`;

    router.push(targetUrl, { scroll: false });
    router.refresh();
  };

  const renderColorFilter = (
  fieldName: string,
  data: Record<string, number>
) => {
  const entries = Object.entries(data || {});
  if (!entries.some(([, count]) => count > 0)) return null;

  return (
    <div className="mb-4 bg-white py-2">
      <div className="border-[#cb934f]/40 border-b-2 mb-2 px-4 pb-1 flex justify-between items-center">
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
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(fieldName, name)}
              className="absolute opacity-0 pointer-events-none"
            />

            {/* Color swatch */}
            <span
              className="h-5 w-5 rounded-full border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: color }}
            />

            {/* Custom checkbox */}
            <span
              className={`
                flex h-4 w-4 items-center justify-center
                rounded border transition
                ${checked
                  ? "bg-[#cb934f] border-[#cb934f]"
                  : "bg-white border-gray-300"}
              `}
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

            {/* Label */}
            <span className="flex-1 capitalize">
              {name} <span className="text-gray-500">({count})</span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

  // Renders a UI section for any filter list
  const renderFilter = (
    title: string,
    fieldName: string,
    data: Record<string, number>
  ) => {
    const entries = Object.entries(data || {});
    if (entries.length === 0) return null;

    return (
      <div className="mb-4 bg-white py-2">
        <div className="border-[#cb934f]/40 border-b-2 mb-2 px-4 pb-1">
          <span className="font-semibold text-base mb-2">{title}:</span>
        </div>
        {entries.map(([name, count]) => {
          if (count === 0) return null;
          const checked = currentFilters[fieldName] === name;

          return (
            <label
              key={name}
              className={`flex items-start gap-3 px-4 py-2 text-sm cursor-pointer
                
                `}
            >
              {/* Native checkbox (hidden but functional) */}
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(fieldName, name)}
                className="absolute opacity-0 pointer-events-none"
              />

              {/* Custom checkbox */}
              <span
                className={`
      mt-0.5 flex h-5 w-5 items-center justify-center
      rounded-md border-2 transition-all duration-200
      ${checked ? "bg-[#cb934f] border-[#cb934f]" : "bg-white border-gray-300"}
    `}
              >
                {checked && (
                  <Check size={14} strokeWidth={3} className="text-white" />
                )}
              </span>

              {/* Label text */}
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
    <aside className="mb-8 bg-skin rounded-sm py-4 px-5">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {renderFilter("Price", "price", filterCounts.price)}
      {renderColorFilter("colorTone", filterCounts.colorTone)}
      {renderFilter("Finish", "finish", filterCounts.finish)}
      {renderFilter("Thickness", "thickness", filterCounts.thickness)}
      {renderFilter("Size", "size", filterCounts.size)}
      {renderFilter("Pcs", "pcs", filterCounts.pcs)}
      {renderFilter("Pack Size", "packSize", filterCounts.packSize)}
    </aside>
  );
}