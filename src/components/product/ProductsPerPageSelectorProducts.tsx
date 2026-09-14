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


  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (value: number) => {
    const params = new URLSearchParams();

    // Preserve existing filters
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    // Default limit doesn't need to be in URL
    if (value === 12) {
      params.delete("limit");
    } else {
      params.set("limit", String(value));
    }

    // Changing products per page always returns to page 1
    params.delete("page");

    const queryString = params.toString();

    router.push(
      queryString
        ? `/products?${queryString}`
        : `/products`
    );

    setOpen(false);
  };


  /* =========================================================
     CLOSE ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      ref={ref}
      className="
        relative
        hidden
        w-fit
        items-center
        gap-2
        font-sans
        sm:flex
      "
    >

      {/* =====================================================
          LABEL
      ===================================================== */}

      <span
        className="
          text-[12px]
          font-semibold
          text-[#99a14e]
        "
      >
        Products per page
      </span>


      {/* =====================================================
          TRIGGER
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          flex
          cursor-pointer
          appearance-none
          items-center
          gap-x-1
          border
          border-[#262a18]/20
          bg-white
          px-3
          py-2
          text-xs
          font-sans
          text-[#262a18]
          transition-colors
          hover:border-[#99a14e]
        "
      >
        {currentLimit}

        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>


      {/* =====================================================
          DROPDOWN
      ===================================================== */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-32
            overflow-hidden
            border
            border-[#262a18]/20
            bg-white
            shadow-lg
          "
          role="listbox"
        >

          {options.map((option) => {
            const active = option === currentLimit;

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleChange(option)}
                role="option"
                aria-selected={active}
                className={`
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  px-4
                  py-2
                  text-sm
                  transition-colors

                  ${
                    active
                      ? "bg-[#f5f0e8] font-semibold text-[#99a14e]"
                      : "text-[#262a18] hover:bg-[#f5f0e8]"
                  }
                `}
              >
                {option}

                {active && (
                  <Check
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#99a14e]"
                  />
                )}
              </button>
            );
          })}

        </div>
      )}

    </div>
  );
}