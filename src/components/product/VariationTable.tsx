"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductVariation } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Props {
  productId: number;
  variations: ProductVariation[];
  productDiscount?: number | null;
  categoryDiscount?: number | null;
}

export default function VariationTable({
  productId,
  variations,
  productDiscount,
  categoryDiscount,
}: Props) {
  const router = useRouter();

  const [qty, setQty] = useState<Record<number, number>>({});
  const [openId, setOpenId] = useState<number | null>(null);

  /* ---------------- DISCOUNT ---------------- */
  const usedDiscount = useMemo(() => {
    if (productDiscount && productDiscount > 0) return productDiscount;
    if (categoryDiscount && categoryDiscount > 0) return categoryDiscount;
    return 0;
  }, [productDiscount, categoryDiscount]);

  const getBeforePrice = (price: number) => {
    if (!usedDiscount) return null;
    return Math.floor(price * (1 + usedDiscount / 100));
  };

  const getYouSave = (price: number) => {
    const before = getBeforePrice(price);
    if (!before) return null;
    const save = before - price;
    return save > 0 ? save : null;
  };

  /* ---------------- INIT QTY ---------------- */
  useEffect(() => {
    const initial: Record<number, number> = {};
    variations.forEach((v) => {
      if (v.Stock > 0) initial[v.id] = 0;
    });
    setQty(initial);
  }, [variations]);

  /* ---------------- QTY CONTROL ---------------- */
  const set = (id: number, value: number, stock: number) => {
    setQty((s) => ({
      ...s,
      [id]: Math.max(0, Math.min(value, stock)),
    }));
  };

  /* ---------------- TOTALS ---------------- */
  const selected = variations.filter((v) => qty[v.id] > 0);
  const totalUnits = selected.reduce((s, v) => s + qty[v.id], 0);
  const totalPrice = selected.reduce((s, v) => s + qty[v.id] * v.Price, 0);

  /* ---------------- ADD TO CART ---------------- */
  const addAll = async () => {
    for (const v of selected) {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: productId,
          variation_id: v.id,
          quantity: qty[v.id],
        }),
      });
    }

    router.refresh();
    alert("Added to cart");
  };

  return (
    <div className="rounded-md bg-skin shadow-md divid">
      {variations.map((v) => {
        const q = qty[v.id] ?? 0;
        const isLow = v.Stock > 0 && v.Stock <= 5;
        const isOut = v.Stock <= 0;
        const before = getBeforePrice(v.Price);
        const youSave = getYouSave(v.Price);

        return (
          <div className="border-b border-gray-200" key={v.id}>
            {/* Mobile header */}
            <button
              onClick={() => setOpenId(openId === v.id ? null : v.id)}
              className="w-full flex justify-between items-center p-3 md:hidden"
            >
              <span className="font-medium">
                {v.Size} • {v.Thickness}
              </span>
              <ChevronDown
                className={`transition ${
                  openId === v.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Row */}
            <div
              className={`p-3 grid md:grid-cols-[1fr_140px_160px] gap-4 items-center ${
                openId !== v.id ? "hidden md:grid" : "grid"
              }`}
            >
              {/* Details */}
              <div>
                <div className="font-medium">
                  {v.Size} • {v.Thickness}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Finish : </span><span className="capitalize">{v.Finish}</span> |{" "}
                  <span className="font-medium">Pack Size : </span>
                  {v.PackSize} m² |{" "}
                  <span className="font-medium">Pcs : </span>{v.Pcs} pcs |{" "}
                  {v.Per_m2 ? `£${v.Per_m2.toFixed(2)} /m²` : "—"}
                </div>

                <div
                  className={`text-xs font-semibold mt-1 ${
                    isOut
                      ? "text-red-500"
                      : isLow
                      ? "text-red-500 animate-pulse"
                      : "text-green-600"
                  }`}
                >
                  {isOut
                    ? "Out of stock"
                    : isLow
                    ? `${v.Stock} packs left`
                    : "In stock"}
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                {usedDiscount > 0 && (
                  <div className="text-xs text-green-600 font-medium">
                    {usedDiscount}% OFF
                  </div>
                )}
                {before && (
                  <div className="text-xs line-through text-gray-400">
                    £{before.toFixed(2)}
                  </div>
                )}
                <div className="font-semibold text-amber-700">
                  £{v.Price.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600">per pack</div>
                {youSave && (
                  <div className="text-xs text-green-700 font-semibold">
                    You save £{youSave.toFixed(2)}
                  </div>
                )}

                

                
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => set(v.id, q - 1, v.Stock)}
                  disabled={isOut}
                  className="w-8 h-8 font-medium text-lg bg-[#cc9450] hover:bg-[#4c4331] text-white cursor-pointer rounded disabled:opacity-30"
                >
                  −
                </button>
                <div className="w-10 text-center text-lg font-semibold">
                  {q}
                </div>
                <button
                  onClick={() => set(v.id, q + 1, v.Stock)}
                  disabled={isOut}
                  className="w-8 h-8 font-medium text-lg bg-[#cc9450] hover:bg-[#4c4331] text-white cursor-pointer rounded disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">
            Total units: <b>{totalUnits}</b>
          </div>
          <div className="text-lg text-dark font-semibold">
            £{totalPrice.toFixed(2)}
          </div>
        </div>

        <button
          disabled={!selected.length}
          onClick={addAll}
          className="button-1 text-white px-6 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
