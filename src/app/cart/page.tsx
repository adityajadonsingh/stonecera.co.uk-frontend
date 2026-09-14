// FILE: frontend/src/app/cart/page.tsx
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AppUser, ProductVariation } from "@/lib/types";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import Image from "next/image";
// --- Type Definitions ---

type MinimalImage = { url: string; alt: string | null };

type MinimalProduct = {
  id?: number;
  name?: string;
  slug?: string;
  image?: string | null;
  images?: MinimalImage[];
  [key: string]: unknown;
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
  [key: string]: unknown;
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

// --- Helper Functions ---

function currencyFormat(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

// --- Main Component ---

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthUser();
  // State for cart, user, and delivery logic
  const [items, setItems] = useState<CartItem[]>([]);
  // const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState<DeliveryResponse | null>(null);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [method, setMethod] = useState<"economy" | "premium" | null>(null);
  const [tailLift, setTailLift] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const { removeFromCart } = useCart();

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      let data = await res.json();
      if (!res.ok) {
        const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        // console.log(cart);
        const res = await fetch("/api/cart/guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
          }),
        });

        data = await res.json();
        // console.log(data);
      }
      const cartJson = data as CartItem[];
      setItems(Array.isArray(cartJson) ? cartJson : []);
    } catch (e: unknown) {
      console.error("fetchCart error:", e);
      setErr("Server error");
    }
  }, []);

  // Fetch initial cart and user data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await fetchCart();
      if (user) {
        const savedAddresses = user.userDetails?.savedAddresses;
        if (savedAddresses && savedAddresses.length > 0) {
          const firstAddress = savedAddresses[0];
          setSelectedAddressId(String(firstAddress.id ?? 0));
          if (firstAddress.pincode) {
            setPincode(firstAddress.pincode);
            void fetchDelivery(firstAddress.pincode);
          }
        }
      }
      setLoading(false);
    }
    void loadData();
  }, [fetchCart]);

  // --- Memoized Calculations for Totals ---

  const cartSubtotal = useMemo(() => {
    return items.reduce(
      (acc, it) => acc + Number(it.unit_price ?? 0) * it.quantity,
      0,
    );
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((acc, it) => acc + it.quantity, 0);
  }, [items]);

const shippingCost = useMemo(() => {
  if (!delivery || !method) return 0;

  const priceStr =
    method === "economy"
      ? delivery.economy_price
      : delivery.premium_price;

  const basePrice = Number(priceStr ?? 0);

  return basePrice * totalQuantity * 1.05; // 5% surcharge per item
}, [delivery, method, totalQuantity]);

const tailLiftCost = useMemo(() => {
  return tailLift ? TAIL_LIFT_COST * totalQuantity : 0;
}, [tailLift, totalQuantity]);

const total = useMemo(() => {
  return cartSubtotal + shippingCost + tailLiftCost;
}, [cartSubtotal, shippingCost, tailLiftCost]);

  // --- API Handlers ---

  async function fetchDelivery(pincodeValue: string) {
    setDelivery(null);
    setDeliveryError(null);
    if (!pincodeValue || pincodeValue.trim().length < 3) {
      setDeliveryError("Please enter a valid postcode.");
      return;
    }
    setLoadingDelivery(true);
    try {
      const res = await fetch(
        `/api/delivery/${encodeURIComponent(pincodeValue)}`,
      );
      if (!res.ok) {
        const txt = await res.text().catch(() => "Delivery check failed.");
        setDeliveryError(txt);
        return;
      }
      const json = (await res.json()) as DeliveryResponse;
      setDelivery(json);
      if (json && json.economy_price) {
        setMethod("economy");
      }
    } catch (err: unknown) {
      setDeliveryError("Could not connect to delivery service.");
    } finally {
      setLoadingDelivery(false);
    }
  }

  async function handleRemoveItem(itemId: number) {
    if (!confirm("Are you sure you want to remove this item?")) return;

    await removeFromCart(itemId);

    await fetchCart();
  }

  async function handleUpdateQuantity(itemId: number, newQuantity: number) {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;

    const stock = item.variation?.stock ?? Infinity;
    const clampedQuantity = Math.max(1, Math.min(newQuantity, stock));

    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId ? { ...it, quantity: clampedQuantity } : it,
      ),
    );

    try {
      await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: clampedQuantity }),
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to update quantity:", err);
      void fetchCart(); // Revert on failure
    }
  }

  function handleProceedToCheckout() {
    if (!method) {
      alert("Please select a delivery option.");
      return;
    }
    const selectedSavedAddress = user?.userDetails?.savedAddresses?.find(
      (addr) => String(addr.id) === selectedAddressId,
    );

    const checkoutData = {
      items: items.map((it) => ({
        product: it.product?.id,
        variation_id: it.variation?.id,
        quantity: it.quantity,
        unit_price: it.unit_price,
      })),
      shipping: {
        pincode,
        method,
        shippingCost,
        tailLift,
        address: selectedSavedAddress ?? { pincode },
      },
      totals: {
        itemPrices: items.map((it) => ({
          variation_id: it.variation?.id,
          checkoutPrice: it.unit_price,
        })),
        cartSubtotal,
        shippingCost,
        tailLift: tailLiftCost,
        total,
      },
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    router.push("/checkout");
  }

  if (loading)
    return (
      <div className="p-6 min-h-[70vh] flex justify-center items-center">
        <span className="block heading font-semibold text-2xl">
          Loading Cart...
        </span>
      </div>
    );
  if (err) return <div className="p-6 text-red-500">{err}</div>;

  return (
    <div className="bg-skin">
      <div className="container mx-auto md:py-16 py-8 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Cart Items */}
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500 mb-2">
            <Link href="/">Home</Link> / Cart
          </p>
          <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="min-h-[40vh]">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              items.map((item) => {
                const stock = item.variation?.stock;
                const imageUrl = item.product?.image;
                // console.log(imageUrl);
                return (
                  <div
                    key={item.id}
                    className="flex items-start justify-between border-b pb-4"
                  >
                    <div className="flex items-start gap-4">
                      <Link href={`/product/${item.product?.slug}/`}>
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.product?.name ?? ""}
                            width={96}
                            height={96}
                            sizes="96px"
                            className="w-24 h-24 object-cover rounded"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 rounded"></div>
                        )}
                      </Link>
                      <div>
                        <Link href={`/product/${item.product?.slug}/`}>
                          <h3 className="font-medium">{item.product?.name}</h3>
                        </Link>
                        {item.metadata?.variation && (
                          <div className="text-sm text-gray-500">
                            {item.metadata.variation.Thickness && (
                              <p>
                                <strong>Thickness:</strong>{" "}
                                {item.metadata.variation.Thickness.replace(
                                  /^THICKNESS\s*/i,
                                  "",
                                )}
                              </p>
                            )}
                            {item.metadata.variation.Size && (
                              <p>
                                <strong>Size:</strong>{" "}
                                {item.metadata.variation.Size.replace(
                                  /^SIZE\s*/i,
                                  "",
                                )}
                              </p>
                            )}
                            {item.metadata.variation.Finish && (
                              <p>
                                <strong>Finish:</strong>{" "}
                                <span className="capitalize">
                                  {item.metadata.variation.Finish}
                                </span>
                              </p>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-gray-500">
                          <strong> Unit Price:</strong>{" "}
                          {currencyFormat(Number(item.unit_price ?? 0))}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm">Quantity:</span>

                          <div className="flex items-center bg-white rounded overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 bg-[#4c4331] text-white hover:bg-[#cc944f] cursor-pointer disabled:opacity-40"
                            >
                              <Minus size={16} />
                            </button>

                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value || "1", 10);
                                handleUpdateQuantity(item.id, val);
                              }}
                              className="w-12 text-center outline-none"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={
                                stock !== undefined &&
                                stock !== null &&
                                item.quantity >= stock
                              }
                              className="px-2 py-1 bg-[#4c4331] text-white hover:bg-[#cc944f] cursor-pointer disabled:opacity-40"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        {stock !== undefined && stock !== null && (
                          <p className="text-xs text-gray-500 mt-1">
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-full">
                      <p className="font-semibold">
                        {currencyFormat(
                          Number(item.unit_price ?? 0) * item.quantity,
                        )}
                      </p>
                      <button
                        onClick={() =>
                          handleRemoveItem(
                            user ? item.id : Number(item.variation?.id ?? 0),
                          )
                        }
                        className="bg-red-500 cursor-pointer hover:bg-red-700 flex gap-x-2 items-center rounded-sm text-white py-1 px-3 text-sm mt-2"
                      >
                        <Trash2 size={16} />
                        <span className="font-medium"> Remove item</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Cart Totals & Delivery */}
        {items.length !== 0 && (
          <div className="md:col-span-1 space-y-6">
            <div className="p-4 shadow-md bg-gray-50 rounded-lg ">
              <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currencyFormat(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {shippingCost > 0 ? currencyFormat(shippingCost) : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tail Lift</span>
                  <span>{tailLift ? currencyFormat(tailLiftCost) : "—"}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>{currencyFormat(total)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 shadow-md bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Delivery Options</h2>
              {user?.userDetails?.savedAddresses &&
                user.userDetails.savedAddresses.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Use a saved address
                    </label>
                    <select
                      value={selectedAddressId}
                      onChange={(e) => {
                        const newId = e.target.value;
                        setSelectedAddressId(newId);
                        const selected = user.userDetails?.savedAddresses?.find(
                          (addr) => String(addr.id) === newId,
                        );
                        if (selected?.pincode) {
                          setPincode(selected.pincode);
                          void fetchDelivery(selected.pincode);
                        }
                      }}
                      className="w-full border rounded p-2"
                    >
                      <option value="">-- Select an address --</option>
                      {user.userDetails.savedAddresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.address}, {addr.city}, {addr.pincode}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              <div className="flex items-end gap-2 mb-4">
                <div className="flex-grow">
                  {user ? (
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium mb-1"
                    >
                      Or enter Postcode
                    </label>
                  ) : (
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium mb-1"
                    >
                      Check Postcode
                    </label>
                  )}
                  <input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.toUpperCase())}
                    className="w-full border rounded p-2"
                    placeholder="e.g. SW1A 0AA"
                  />
                </div>
                <button
                  onClick={() => void fetchDelivery(pincode)}
                  disabled={!pincode || loadingDelivery}
                  className="px-4 py-2 h-full cursor-pointer bg-[#4c4331] text-white rounded hover:bg-[#cd9450] disabled:bg-gray-400"
                >
                  {loadingDelivery ? "Checking..." : "Check"}
                </button>
              </div>

              {deliveryError && (
                <p className="text-sm text-red-500">{deliveryError}</p>
              )}

              {delivery && (
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={method === "economy"}
                      onChange={() => setMethod("economy")}
                    />
                    <div>
                      <span className="font-medium">Economy Delivery</span>
                      <span className="ml-2">
                        {currencyFormat(Number(delivery.economy_price ?? 0))} / palet
                      </span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={method === "premium"}
                      onChange={() => setMethod("premium")}
                    />
                    <div>
                      <span className="font-medium">Premium Delivery</span>
                      <span className="ml-2">
                        {currencyFormat(Number(delivery.premium_price ?? 0))} / palet
                      </span>
                    </div>
                  </label>
                </div>
              )}

              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tailLift}
                    onChange={(e) => setTailLift(e.target.checked)}
                  />
                  <span className="text-sm">
                    Add Tail Lift Service (+{currencyFormat(TAIL_LIFT_COST)})
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              disabled={items.length === 0 || !method || loading}
              className="w-full cursor-pointer py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
