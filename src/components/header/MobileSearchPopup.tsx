"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import SearchDropdown from "./SearchDropdown";

interface Props {
  open: boolean;
  query: string;
  setQuery: (v: string) => void;
  results: any;
  onClose: () => void;
}

export default function MobileSearchPopup({
  open,
  query,
  setQuery,
  results,
  onClose,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  /* -------- ESC KEY -------- */
  useEffect(() => {
    if (!open) return;

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    /* ---------- OVERLAY ---------- */
    <div
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-[2px]"
      onClick={onClose} // 👈 click outside closes
    >
      {/* ---------- CONTENT ---------- */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside
        className="bg-white w-full max-w-full"
      >
        {/* Search bar */}
        <div className="p-4 flex items-center gap-2 border-b">
          <Search size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or categories..."
            className="flex-1 outline-none"
          />
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Results */}
        <div className="relative">
          <SearchDropdown
            open={true}
            results={results}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
