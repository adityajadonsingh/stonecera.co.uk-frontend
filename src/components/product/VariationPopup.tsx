"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ProductVariation } from "@/lib/types";
import { formatFilterLabel } from "@/lib/formatters";

interface Props {
  open: boolean;
  onClose: () => void;
  variations?: ProductVariation[];
  name?: string;
  slug?: string;
}

export default function VariationPopup({
  open,
  onClose,
  variations = [],
  name,
  slug,
}: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  /* ---------- CLOSE ON OUTSIDE CLICK / ESC ---------- */

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px] flex items-center justify-center px-4">
      <div
        ref={popupRef}
        className="bg-white w-full max-w-4xl overflow-hidden shadow-lg"
      >
        {/* HEADER */}

        <div className="flex justify-between items-center bg-[#262a18] p-6">
          <h3 className="text-white font-sans text-xl font-bold uppercase tracking-widest">
            {name} - Variations
          </h3>

          <button
            onClick={onClose}
            className=" text-white/70 hover:text-white cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <div className="p-6 font-sans">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100 text-[11px] uppercase tracking-wider font-bold text-gray-400">
                  <th className="px-4 py-4">Size &amp; Thickness</th>
                  <th className="px-4 py-4">Pcs</th>
                  <th className="px-4 py-4">Finish</th>
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4 text-right">Per m²</th>
                  <th className="px-4 py-4 text-right">Per Pack</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {variations.map((v) => {
                  const pricing = v.pricing;
                  const hasDiscount = pricing.isDiscounted;

                  const size = formatFilterLabel("size", v.Size);
                  const thickness = formatFilterLabel("thickness", v.Thickness);

                  return (
                    <tr
                      key={v.id}
                      className="text-sm text-[#262a18] hover:bg-gray-50 transition-colors"
                    >
                      {/* SIZE & THICKNESS */}
                      <td className="px-4 py-5 font-bold">
                        {size} • {thickness}
                      </td>

                      {/* PCS */}
                      <td className="px-4 py-5 text-gray-500">{v.Pcs}</td>

                      {/* FINISH */}
                      <td className="px-4 py-5 text-gray-500 uppercase">
                        {v.Finish}
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-5 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                            v.Stock > 0
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {v.Stock > 0 ? "AVAILABLE" : "OUT OF STOCK"}
                        </span>
                      </td>

                      {/* PER M² */}
                      <td className="px-4 py-5 text-right font-bold text-[#a67c52]">
                        {hasDiscount && (
                          <div className="text-gray-400 line-through text-[10px] font-medium">
                            £{pricing.perM2.original.toFixed(2)}
                          </div>
                        )}

                        <div>£{pricing.perM2.selling.toFixed(2)}</div>
                      </td>

                      {/* PER PACK */}
                      <td className="px-4 py-5 text-right font-bold">
                        {hasDiscount && (
                          <div className="text-gray-400 line-through text-[10px] font-medium">
                            £{pricing.pack.original.toFixed(2)}
                          </div>
                        )}

                        <div>£{pricing.pack.selling.toFixed(2)}</div>
                      </td>
                    </tr>
                  );
                })}

                {!variations.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-400"
                    >
                      No variations available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex justify-end">
          <Link
            className="bg-[#a67c52] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#8e6a46] transition-colors"
            href={`/product/${slug}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
