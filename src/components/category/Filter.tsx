"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FilterCounts } from "@/lib/types";
import { useTransition } from "react";

interface FiltersProps {
  currentFilters: Record<string, string>;
  categorySlug: string;
  filterCounts: FilterCounts;
}

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

  // Renders a UI section for any filter list
  const renderFilter = (
    title: string,
    fieldName: string,
    data: Record<string, number>
  ) => {
    const entries = Object.entries(data || {});
    if (entries.length === 0) return null;

    return (
      <section className="mb-4">
        <h3 className="font-semibold text-base mb-2">{title}:</h3>
        {entries.map(([name, count]) => {
          const checked = currentFilters[fieldName] === name;

          return (
            <label
              key={name}
              className={`flex items-center space-x-2 text-sm ${
                count === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="checkbox"
                disabled={isPending || count === 0}
                checked={checked}
                onChange={() => handleChange(fieldName, name)}
                className="accent-black cursor-pointer"
              />
              <span>
                {title === "Price" && name.includes("-")
                  ? `£${name.replace("-", " - £")}`
                  : name}{" "}
                ({count})
              </span>
            </label>
          );
        })}
      </section>
    );
  };

  return (
    <aside className="mb-8 bg-gray-100 py-4 px-5">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {renderFilter("Price", "price", filterCounts.price)}
      {renderFilter("Color & Tone", "colorTone", filterCounts.colorTone)}
      {renderFilter("Finish", "finish", filterCounts.finish)}
      {renderFilter("Thickness", "thickness", filterCounts.thickness)}
      {renderFilter("Size", "size", filterCounts.size)}
      {renderFilter("Pcs", "pcs", filterCounts.pcs)}
      {renderFilter("Pack Size", "packSize", filterCounts.packSize)}
    </aside>
  );
}
