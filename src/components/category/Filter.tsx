"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FilterCounts } from "@/lib/types";
import { useEffect, useState, useTransition } from "react";
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
  Bronze: "#cd7f32",
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
  categorySlug,
  filterCounts,
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const priceMin = Number(filterCounts.price?.min ?? 0);
  const priceMax = Number(filterCounts.price?.max ?? 0);

  const urlPrice = Number(searchParams.get("price") || priceMax);

  const initialPrice = Math.min(Math.max(urlPrice, priceMin), priceMax);

  const [priceValue, setPriceValue] = useState(initialPrice);
  /*
   * ------------------------------------------------------------
   * GET SELECTED VALUES
   * ------------------------------------------------------------
   *
   * URL:
   *
   * ?colorTone=Black,Grey
   *
   * becomes:
   *
   * ["Black", "Grey"]
   */
  const getSelectedValues = (filterName: string): string[] => {
    const value = searchParams.get(filterName);

    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  /*
   * ------------------------------------------------------------
   * MULTI SELECT FILTER
   * ------------------------------------------------------------
   */
  const handleChange = (filterName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedValues = getSelectedValues(filterName);

    const exists = selectedValues.includes(value);

    let updatedValues: string[];

    if (exists) {
      // Remove selected value
      updatedValues = selectedValues.filter((item) => item !== value);
    } else {
      // Add selected value
      updatedValues = [...selectedValues, value];
    }

    if (updatedValues.length === 0) {
      params.delete(filterName);
    } else {
      params.set(filterName, updatedValues.join(","));
    }

    // Any filter change should reset pagination.
    params.delete("page");

    const query = params.toString();

    const targetUrl = `/product-category/${categorySlug}${
      query ? `?${query}` : ""
    }`;

    startTransition(() => {
      router.push(targetUrl, {
        scroll: false,
      });
    });

    // Close mobile drawer after selection.
    setOpen(false);
  };
  useEffect(() => {
    const urlPrice = Number(searchParams.get("price") || priceMax);

    const safePrice = Math.min(Math.max(urlPrice, priceMin), priceMax);

    setPriceValue(safePrice);
  }, [searchParams, priceMin, priceMax]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    setPriceValue(value);
  };

  useEffect(() => {
    if (priceValue >= priceMax) {
      // Already at maximum, so no price filter is required.
      return;
    }

    const timer = setTimeout(() => {
      const currentUrlPrice = Number(searchParams.get("price") || priceMax);

      // Don't push if URL already contains this value.
      if (currentUrlPrice === priceValue) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      params.set("price", String(priceValue));
      params.delete("page");

      const query = params.toString();

      const targetUrl = `/product-category/${categorySlug}${
        query ? `?${query}` : ""
      }`;

      startTransition(() => {
        router.push(targetUrl, {
          scroll: false,
        });
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    priceValue,
    priceMax,
    searchParams,
    categorySlug,
    router,
    startTransition,
  ]);

  /*
   * ------------------------------------------------------------
   * COLOR FILTER
   * ------------------------------------------------------------
   */
  const renderColorFilter = (
    fieldName: string,
    data: Record<string, number>,
  ) => {
    const entries = Object.entries(data || {}).filter(([, count]) => count > 0);

    if (!entries.length) return null;

    const selectedValues = getSelectedValues(fieldName);

    return (
      <div className="mb-6 pb-6 border-b border-[#262a18]/10">
        <p className="text-sm tracking-[0.2em] uppercase mb-3 font-semibold text-[#99a14e]">
          Colour
        </p>

        <div className="flex flex-wrap gap-3">
          {entries.map(([name, count]) => {
            const checked = selectedValues.includes(name);
            const color = COLOR_MAP[name] || "#ccc";

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleChange(fieldName, name)}
                className="group flex cursor-pointer flex-col items-center gap-1"
              >
                <span
                  className={`w-8 h-8 border-2 transition-all ${
                    checked
                      ? "border-[#4a5530] outline-1 outline-[#4a5530] outline-offset-1"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                />

                <span
                  className={`text-xs tracking-wide ${
                    checked ? "font-semibold text-[#262a18]" : "text-[#99a14e]"
                  }`}
                >
                  {name}
                </span>

                <span className="text-xs text-gray-400">({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /*
   * ------------------------------------------------------------
   * CHECKBOX FILTER
   * ------------------------------------------------------------
   *
   * Used for:
   *
   * Finish
   * Pcs
   * Pack Size
   */
  const renderCheckboxFilter = (
    title: string,
    fieldName: string,
    data: Record<string, number>,
  ) => {
    const entries = Object.entries(data || {}).filter(([, count]) => count > 0);

    if (!entries.length) return null;

    const selectedValues = getSelectedValues(fieldName);

    return (
      <div className="mb-6 pb-6 border-b border-[#262a18]/10">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 font-semibold text-[#99a14e]">
          {title}
        </p>

        <div className="space-y-2">
          {entries.map(([name, count]) => {
            const checked = selectedValues.includes(name);

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleChange(fieldName, name)}
                className="flex items-center cursor-pointer gap-2 w-full text-left"
              >
                <span
                  className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                    checked
                      ? "bg-[#4a5530] border-[#4a5530]"
                      : "bg-transparent border-[#262a18]/30"
                  }`}
                >
                  {checked && (
                    <Check size={11} strokeWidth={3} className="text-white" />
                  )}
                </span>

                <span
                  className={`text-sm capitalize ${
                    checked ? "font-medium text-[#262a18]" : "text-[#262a18]"
                  }`}
                >
                  {formatFilterLabel(fieldName, name)}
                </span>

                <span className="text-xs text-gray-500">({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /*
   * ------------------------------------------------------------
   * BUTTON / CHIP FILTER
   * ------------------------------------------------------------
   *
   * Used for:
   *
   * Thickness
   * Size
   */
  const renderButtonFilter = (
    title: string,
    fieldName: string,
    data: Record<string, number>,
  ) => {
    const entries = Object.entries(data || {}).filter(([, count]) => count > 0);

    if (!entries.length) return null;

    const selectedValues = getSelectedValues(fieldName);

    return (
      <div className="mb-6 pb-6 border-b border-[#262a18]/10 ">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 font-semibold text-[#99a14e]">
          {title}
        </p>

        <div className="flex flex-wrap gap-2">
          {entries.map(([name, count]) => {
            const checked = selectedValues.includes(name);

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleChange(fieldName, name)}
                className={`px-3 cursor-pointer py-1.5 text-xs border transition-colors ${
                  checked
                    ? "bg-[#4a5530] border-[#4a5530] text-white"
                    : "bg-transparent border-[#262a18]/20 text-[#262a18] hover:border-[#4a5530]"
                }`}
              >
                {formatFilterLabel(fieldName, name)}

                <span
                  className={`ml-1 ${
                    checked ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /*
   * ------------------------------------------------------------
   * PRICE FILTER
   * ------------------------------------------------------------
   */
  const renderPriceFilter = () => {
    if (
      !Number.isFinite(priceMin) ||
      !Number.isFinite(priceMax) ||
      priceMax <= priceMin
    ) {
      return null;
    }

    return (
      <div className="mb-6 pb-6 border-b border-[#262a18]/10">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 font-semibold text-[#99a14e]">
          Max Pack Price
        </p>

        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step="1"
          value={priceValue}
          onChange={handlePriceChange}
          className="w-full accent-[#4a5530] cursor-pointer"
        />

        <div className="flex justify-between mt-1">
          <span className="text-sm text-[#99a14e]">
            <span className="text-[#d8c06a]">£</span>
            {priceMin.toFixed(0)}
          </span>

          <span className="text-sm font-medium text-[#262a18]">
            <span className="text-[#d8c06a]">£</span>
            {priceValue.toFixed(0)}
          </span>
        </div>

        {priceValue < priceMax && (
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());

              params.delete("price");
              params.delete("page");

              const query = params.toString();

              const targetUrl = `/product-category/${categorySlug}${
                query ? `?${query}` : ""
              }`;

              startTransition(() => {
                router.push(targetUrl, {
                  scroll: false,
                });
              });
            }}
            className="mt-2 cursor-pointer text-[10px] underline text-gray-500 hover:text-[#4a5530]"
          >
            Clear price
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ------------------------------------------------------- */}
      {/* MOBILE FILTER BUTTON */}
      {/* ------------------------------------------------------- */}

      <div className="lg:hidden flex justify-start relative ">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-[-3px] flex cursor-pointer items-center gap-2 px-4 py-2 border border-[#262a18]/20 rounded-md bg-white hover:bg-[#f7f3eb] text-sm font-medium"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* ------------------------------------------------------- */}
      {/* MOBILE OVERLAY */}
      {/* ------------------------------------------------------- */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-80 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ------------------------------------------------------- */}
      {/* SIDEBAR / DRAWER */}
      {/* ------------------------------------------------------- */}

      <aside
        className={`
          fixed lg:h-fit h-full inset-y-0 right-0 z-90
          sm:w-[85%] w-full sm:max-w-sm
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          rounded-none lg:rounded-sm
          overscroll-contain
          py-6 px-5
          mb-8
          font-sans
          bg-[#f9f7f3]
          lg:static lg:translate-x-0 lg:w-auto
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-3 border-b border-[#262a18]/10">
          <span className="font-serif text-lg text-[#262a18]">Filters</span>

          <button type="button" onClick={() => setOpen(false)}>
            <X size={18} className="text-[#262a18]" />
          </button>
        </div>

        <div className="overflow-y-auto lg:h-fit h-full lg:pb-0 pb-24">
          {/* PRICE */}
          {renderPriceFilter()}

          {/* COLOUR */}
          {renderColorFilter("colorTone", filterCounts.colorTone)}

          {/* FINISH */}
          {renderCheckboxFilter("Finish", "finish", filterCounts.finish)}

          {/* THICKNESS */}
          {renderButtonFilter("Thickness", "thickness", filterCounts.thickness)}

          {/* SIZE */}
          {renderButtonFilter("Size", "size", filterCounts.size)}

          {/* PCS */}
          {renderCheckboxFilter("Pcs", "pcs", filterCounts.pcs)}

          {/* PACK SIZE */}
          {renderCheckboxFilter("Pack Size", "packSize", filterCounts.packSize)}
        </div>
      </aside>
    </>
  );
}
