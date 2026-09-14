"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductVariation } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "../ui/ToastProvider";
import {
  CircleCheck,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import DeliveryChecker from "./DeliveryChecker";

interface Props {
  productId: number;
  variations: ProductVariation[];
}

export default function VariationTable({ productId, variations }: Props) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const [qty, setQty] = useState<Record<number, number>>({});

  /* ------------------------------------------------------------
     INITIAL QUANTITY
  ------------------------------------------------------------ */

  useEffect(() => {
    const initial: Record<number, number> = {};

    variations.forEach((variation) => {
      initial[variation.id] = 0;
    });

    setQty(initial);
  }, [variations]);

  /* ------------------------------------------------------------
     SORT VARIATIONS
     
     Cheapest per-m² first.
     
     If two variations have the same per-m² price,
     fall back to pack price.
  ------------------------------------------------------------ */

  const sortedVariations = useMemo(() => {
    return [...variations].sort((a, b) => {
      const aInStock = Number(a.Stock || 0) > 0;
      const bInStock = Number(b.Stock || 0) > 0;

      // 1. In-stock variations always come first
      if (aInStock !== bInStock) {
        return aInStock ? -1 : 1;
      }

      // 2. Within the same stock group,
      //    sort by cheapest per-m² price
      const aPerM2 = Number(a.pricing?.perM2?.selling || 0);
      const bPerM2 = Number(b.pricing?.perM2?.selling || 0);

      if (aPerM2 !== bPerM2) {
        return aPerM2 - bPerM2;
      }

      // 3. If per-m² price is the same,
      //    sort by pack price
      const aPack = Number(a.pricing?.pack?.selling || 0);
      const bPack = Number(b.pricing?.pack?.selling || 0);

      return aPack - bPack;
    });
  }, [variations]);

  /* ------------------------------------------------------------
     QUANTITY CONTROL
  ------------------------------------------------------------ */

  const setQuantity = (id: number, value: number, stock: number) => {
    setQty((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(value, Math.max(0, stock))),
    }));
  };

  /* ------------------------------------------------------------
     SELECTED VARIATIONS
  ------------------------------------------------------------ */

  const selectedVariations = useMemo(() => {
    return sortedVariations.filter((variation) => (qty[variation.id] ?? 0) > 0);
  }, [sortedVariations, qty]);

  /* ------------------------------------------------------------
     TOTAL PACKS
  ------------------------------------------------------------ */

  const totalUnits = useMemo(() => {
    return selectedVariations.reduce((total, variation) => {
      return total + (qty[variation.id] ?? 0);
    }, 0);
  }, [selectedVariations, qty]);

  /* ------------------------------------------------------------
     TOTAL PRICE
  ------------------------------------------------------------ */

  const totalPrice = useMemo(() => {
    return selectedVariations.reduce((total, variation) => {
      const quantity = qty[variation.id] ?? 0;

      const price = Number(variation.pricing?.pack?.selling || 0);

      return total + quantity * price;
    }, 0);
  }, [selectedVariations, qty]);

  /* ------------------------------------------------------------
     ADD TO CART
  ------------------------------------------------------------ */

  const addAll = async () => {
    if (!selectedVariations.length) return;

    try {
      for (const variation of selectedVariations) {
        const quantity = qty[variation.id] ?? 0;

        if (quantity <= 0) continue;

        await addToCart({
          product: productId,
          variation_id: variation.id,
          quantity,
        });
      }

      openCart();
      router.refresh();

      showToast("Added to cart", "success");
    } catch (error) {
      console.error("Failed to add variations to cart:", error);

      showToast("Something went wrong", "error");
    }
  };

  /* ------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------ */

  const cleanValue = (value: string | null | undefined) => {
    if (!value) return "";

    return value.replace(/^SIZE\s+/i, "").replace(/^THICKNESS\s+/i, "");
  };

  const formatMoney = (value: number) => {
    return `£${Number(value || 0).toFixed(2)}`;
  };

  if (!sortedVariations.length) {
    return null;
  }

  /* ------------------------------------------------------------
   TOTAL m²
------------------------------------------------------------ */

  const totalM2 = useMemo(() => {
    return selectedVariations.reduce((total, variation) => {
      const quantity = qty[variation.id] ?? 0;

      const packSize = Number(variation.pricing?.packSize || 0);

      return total + quantity * packSize;
    }, 0);
  }, [selectedVariations, qty]);

  /* ------------------------------------------------------------
   TOTAL SAVINGS
------------------------------------------------------------ */

  const totalSavings = useMemo(() => {
    return selectedVariations.reduce((total, variation) => {
      const quantity = qty[variation.id] ?? 0;

      const originalPrice = Number(variation.pricing?.pack?.original || 0);

      const sellingPrice = Number(variation.pricing?.pack?.selling || 0);

      const savingPerPack = Math.max(0, originalPrice - sellingPrice);

      return total + savingPerPack * quantity;
    }, 0);
  }, [selectedVariations, qty]);

  return (
    <div className="space-y-4 font-sans">
      {/* ========================================================
          VARIATION CARDS
      ======================================================== */}

      {sortedVariations.map((variation) => {
        const quantity = qty[variation.id] ?? 0;
        const isSelected = quantity > 0;

        const stock = Number(variation.Stock || 0);

        const isOutOfStock = stock <= 0;
        const isLowStock = stock > 0 && stock <= 5;

        const pricing = variation.pricing;

        const packPrice = Number(pricing?.pack?.selling || 0);

        const originalPackPrice = Number(pricing?.pack?.original || 0);

        const perM2Price = Number(pricing?.perM2?.selling || 0);

        const originalPerM2Price = Number(pricing?.perM2?.original || 0);

        const packSize = Number(pricing?.packSize || variation.PackSize || 0);

        const hasDiscount =
          pricing?.isDiscounted && originalPackPrice > packPrice;

        return (
          <div
            key={variation.id}
            className={`
  group relative overflow-hidden rounded-xl border
  transition-all duration-300
  ${isSelected
                ? "border-[#a67c52] bg-[#f5f1e8] shadow-sm"
                : isOutOfStock
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
`}
          >
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
              {/* ==================================================
                  LEFT / DETAILS
              ================================================== */}

              <div className="flex-1 space-y-1">
                {/* Size + Thickness */}

                <div className="flex items-center justify-between gap-3 sm:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="font-bold uppercase tracking-tight text-[#262a18]">
                      {cleanValue(variation.Size)}

                      <span className="mx-1 text-gray-300">•</span>

                      {cleanValue(variation.Thickness)}
                    </div>

                    {isSelected && (
                      <span className="rounded-full bg-[#a67c52]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#a67c52]">
                        Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-gray-500">
                  {/* Finish */}

                  {variation.Finish && (
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a67c52]/40" />
                      Finish:{" "}
                      <span className="capitalize">{variation.Finish}</span>
                    </span>
                  )}

                  {/* Pack size */}

                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a67c52]/40" />
                    {packSize.toFixed(2)} m²/pack
                  </span>

                  {/* Pcs */}

                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a67c52]/40" />
                    {variation.Pcs} pcs
                  </span>
                </div>

                {/* Stock */}

                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={`
                      h-2 w-2 rounded-full
                      ${isOutOfStock
                        ? "bg-red-500"
                        : isLowStock
                          ? "bg-[#cc9450] animate-pulse"
                          : "bg-green-500 animate-pulse"
                      }
                    `}
                  />

                  <span
                    className={`
                      text-[11px] font-bold
                      ${isOutOfStock
                        ? "text-red-500"
                        : isLowStock
                          ? "text-[#cc9450]"
                          : "text-green-600"
                      }
                    `}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `In Stock: ${stock} ${stock === 1 ? "pack" : "packs"}`}
                  </span>
                </div>
              </div>

              {/* ==================================================
                  RIGHT / PRICE + QUANTITY
              ================================================== */}

              <div className="flex shrink-0 items-center justify-between gap-2 sm:flex-col sm:items-end">
                {/* Price */}

                <div className="text-right">
                  {hasDiscount && (
                    <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 line-through">
                      {formatMoney(originalPackPrice)}
                    </div>
                  )}

                  <div className="text-xl font-bold text-[#a67c52]">
                    {formatMoney(packPrice)}
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {hasDiscount && originalPerM2Price > perM2Price ? (
                      <>
                        <span className="mr-1 line-through">
                          {formatMoney(originalPerM2Price)}
                        </span>
                        {formatMoney(perM2Price)}
                      </>
                    ) : (
                      `${formatMoney(perM2Price)} per m²`
                    )}
                  </div>
                </div>

                {/* Quantity */}

                <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-1.5">
                  {/* Minus */}

                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${variation.Size}`}
                    onClick={() =>
                      setQuantity(variation.id, quantity - 1, stock)
                    }
                    disabled={isOutOfStock || quantity <= 0}
                    className="
                    cursor-pointer
                      flex h-7 w-7 items-center justify-center
                      rounded-md
                      bg-gray-200
                      text-gray-400
                      transition-colors
                      hover:bg-gray-300
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Minus size={14} />
                  </button>

                  {/* Quantity */}

                  <span className="w-6 text-center text-sm font-bold text-[#262a18]">
                    {quantity}
                  </span>

                  {/* Plus */}

                  <button
                    type="button"
                    aria-label={`Increase quantity of ${variation.Size}`}
                    onClick={() =>
                      setQuantity(variation.id, quantity + 1, stock)
                    }
                    disabled={isOutOfStock || quantity >= stock}
                    className="
                    cursor-pointer
                      flex h-7 w-7 items-center justify-center
                      rounded-md
                      bg-[#a67c52]
                      text-white
                      transition-colors
                      hover:bg-[#262a18]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 overflow-hidden rounded-xl bg-[#262a18] text-white">
        <div className="space-y-4 p-6">
          {/* Order Summary Header */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <span>Order Summary</span>

              <span>
                {totalUnits} {totalUnits === 1 ? "Pack" : "Packs"} /{" "}
                {totalM2.toFixed(2)} m²
              </span>
            </div>

            <div className="h-px bg-white/10" />
          </div>

          {/* Total */}
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#a67c52]">
                  Total Amount{" "}
                  <span className="text-[9px] font-normal normal-case text-gray-500">
                    (Incl. VAT)
                  </span>
                </div>

                <div className="text-3xl font-extrabold">
                  {formatMoney(totalPrice)}
                </div>

                {/* You Save */}
                {totalSavings > 0 && (
                  <div className="mt-1 text-[11px] font-bold text-green-400">
                    You save {formatMoney(totalSavings)}
                  </div>
                )}
              </div>

              <div className="pb-1 text-right">
                <div className="flex items-center justify-end gap-1.5 text-[11px] font-bold text-green-400">
                  <CircleCheck size={14} />
                  Prices Include VAT
                </div>
              </div>
            </div>

            <DeliveryChecker />
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            disabled={!selectedVariations.length}
            onClick={addAll}
            className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-lg
        bg-[#a67c52]
        py-4
        font-extrabold
        text-white
        shadow-lg
        transition-all
        hover:bg-[#c19262]
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-50
        cursor-pointer
      "
          >
            <ShoppingCart size={18} />
            Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
}
