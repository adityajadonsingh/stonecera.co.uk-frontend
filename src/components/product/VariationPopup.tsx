"use client";

import { useEffect, useRef } from "react";
import { ProductVariation } from "@/lib/types";
import { formatFilterLabel } from "@/lib/formatters";

interface Props {
  open: boolean;
  onClose: () => void;
  variations?: ProductVariation[];
  name?: string;
}

export default function VariationPopup({
  open,
  onClose,
  variations = [],
  name,
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
      if (e.key === "Escape") onClose();
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
        className="bg-white rounded-md w-full max-w-6xl overflow-hidden shadow-lg"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center bg-dark px-4 py-3">
          <h3 className="text-white font-semibold text-sm">{name}</h3>
          <button
            onClick={onClose}
            className="bg-red-600 text-white text-xs cursor-pointer px-4 py-1 rounded hover:bg-red-500 "
          >
            CLOSE
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead >
              <tr className="bg-dark">
                <th className="p-3 text-left">Size</th>
                <th className="p-3 text-center">Pcs</th>
                <th className="p-3 text-center">Texture</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Thickness</th>
                <th className="p-3 text-center">Per m²</th>
                <th className="p-3 text-center">Per Pack</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {variations.map((v, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 last:border-none hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">
                      {formatFilterLabel("size", v.Size)}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        v.Stock > 0 ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {v.Stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-3 text-center">{v.Pcs}</td>
                  <td className="p-3 text-center">{v.Finish}</td>

                  <td className="p-3 text-center">{v.Stock}</td>

                  <td className="p-3 text-center">
                    {formatFilterLabel("thickness", v.Thickness)}
                  </td>

                  <td className="p-3 text-center font-semibold">
                    £{Number(v.Per_m2).toFixed(2)}
                  </td>

                  <td className="p-3 text-center font-semibold">
                    £{Number(v.Price).toFixed(2)}
                  </td>
                </tr>
              ))}

              {!variations.length && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No variations available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
