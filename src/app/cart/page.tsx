"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AppUser, ProductVariation } from "@/lib/types";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type MinimalImage = { url: string; alt: string | null };

type MinimalProduct = {
  id?: number;
  name?: string;
  slug?: string;
  image?: string | null;
  images?: MinimalImage[];
};

type Metadata = {
  productName?: string | null;
  productImage?: string | null;
  sku?: string | null;
  variation?: ProductVariation | null;
};

type Variation = {
  id?: number | string | null;
  stock?: number | null;
};

type CartItem = {
  id: number;
  quantity: number;
  unit_price?: number | null;
  product?: MinimalProduct | null;
  metadata?: Metadata;
  variation?: Variation | null;
};

type DeliveryResponse = {
  postcode?: string;
  economy_price?: string;
  premium_price?: string;
};

const TAIL_LIFT_COST = 5;

function currencyFormat(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function CartPage() {
  const router = useRouter();
  const { isGuest } = useCart();

  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState<DeliveryResponse | null>(null);
  const [method, setMethod] = useState<"economy" | "premium" | null>(null);
  const [tailLift, setTailLift] = useState(false);

  /* ---------------- FETCH BACKEND CART ---------------- */
  const fetchBackendCart = useCallback(async () => {
    const res = await fetch("/api/cart", { credentials: "include" });
    if (!res.ok) return;

    const json = await res.json();
    setItems(json);
  }, []);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    async function load() {
      setLoading(true);

      const userRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (userRes.ok) {
        const userJson = await userRes.json();
        setUser(userJson);
        await fetchBackendCart();
      } else {
        setUser(null);

        // Load guest cart
        const stored = localStorage.getItem("guest_cart");
        if (stored) {
          const parsed = JSON.parse(stored);

          const mapped = parsed.map((item: any, index: number) => ({
            id: index + 1,
            quantity: item.quantity,
            unit_price: item.unit_price ?? 0,
            product: {
              id: item.product,
              name: item.productName ?? "Product",
              slug: item.slug ?? "",
              image: item.image ?? null,
            },
            variation: {
              id: item.variation_id,
              stock: 999,
            },
            metadata: {},
          }));

          setItems(mapped);
        }
      }

      setLoading(false);
    }

    load();
  }, [fetchBackendCart]);

  /* ---------------- CALCULATIONS ---------------- */

  const cartSubtotal = useMemo(() => {
    return items.reduce(
      (acc, it) => acc + Number(it.unit_price ?? 0) * it.quantity,
      0
    );
  }, [items]);

  const shippingCost = useMemo(() => {
    if (!delivery || !method) return 0;
    const priceStr =
      method === "economy" ? delivery.economy_price : delivery.premium_price;
    return Number(priceStr ?? 0);
  }, [delivery, method]);

  const total = useMemo(() => {
    return cartSubtotal + shippingCost + (tailLift ? TAIL_LIFT_COST : 0);
  }, [cartSubtotal, shippingCost, tailLift]);

  /* ---------------- REMOVE ITEM ---------------- */

  async function handleRemoveItem(itemId: number) {
    if (!confirm("Remove this item?")) return;

    if (!user) {
      const stored = localStorage.getItem("guest_cart");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      parsed.splice(itemId - 1, 1);
      localStorage.setItem("guest_cart", JSON.stringify(parsed));
      setItems((prev) => prev.filter((it) => it.id !== itemId));
      return;
    }

    setItems((prev) => prev.filter((it) => it.id !== itemId));
    await fetch(`/api/cart/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
  }

  /* ---------------- CHECKOUT ---------------- */

  function handleProceedToCheckout() {
    if (!user) {
      alert("Please login or register to proceed to checkout.");
      router.push("/login");
      return;
    }

    if (!method) {
      alert("Please select delivery option.");
      return;
    }

    router.push("/checkout");
  }

  if (loading) return <div className="p-6">Loading cart...</div>;

  return (
    <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* CART ITEMS */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-4 mb-4"
            >
              <div className="flex gap-4">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded" />
                )}

                <div>
                  <h3 className="font-medium">
                    {item.product?.name ?? "Product"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {currencyFormat(
                      Number(item.unit_price ?? 0) * item.quantity
                    )}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* TOTALS */}
      {items.length > 0 && (
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-4">Cart Totals</h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currencyFormat(cartSubtotal)}</span>
          </div>

          <div className="flex justify-between font-bold mt-3">
            <span>Total</span>
            <span>{currencyFormat(total)}</span>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full mt-4 py-3 bg-green-600 text-white rounded"
          >
            Proceed to Checkout
          </button>

          {isGuest && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              You must login or register to complete checkout.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
