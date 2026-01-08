// File: src/app/checkout/page.tsx

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { AppUser, CheckoutItem } from "@/lib/types";

function currencyFormat(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

const TAIL_LIFT_COST = 5;

type DeliveryResponse = {
  postcode?: string;
  economy_price?: string;
  premium_price?: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<CheckoutItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSavedAddress, setUseSavedAddress] = useState<boolean>(true);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "stripe">("bank");

  // Form state
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    country: "United Kingdom (UK)",
  });

  // Delivery + recalculation states
  const [delivery, setDelivery] = useState<DeliveryResponse | null>(null);
  const [method, setMethod] = useState<"economy" | "premium" | null>(null);
  const [tailLift, setTailLift] = useState(false);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const [recalculated, setRecalculated] = useState(false);

  // --- Load checkout + user ---

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) {
      alert("Your session has expired. Redirecting to cart.");
      router.push("/cart");
      return;
    }

    const parsedData = JSON.parse(data);
    setCheckoutData(parsedData);
    if (parsedData.shipping?.pincode) {
      setShippingAddress((prev) => ({
        ...prev,
        pincode: parsedData.shipping.pincode,
      }));
    }

    async function fetchUser() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) return;
      const userData = (await res.json()) as AppUser;
      const savedAddrs = userData.userDetails?.savedAddresses ?? [];
      setSavedAddresses(savedAddrs);

      if (savedAddrs.length > 0) {
        const addr = savedAddrs[0];
        setUseSavedAddress(true);
        setSelectedAddressIndex(0);
        setShippingAddress({
          firstName: userData.userDetails?.firstName || "",
          lastName: userData.userDetails?.lastName || "",
          address: addr.address || "",
          city: addr.city || "",
          pincode: addr.pincode || "",
          country: "United Kingdom (UK)",
        });
      } else {
        setUseSavedAddress(false);
      }

      setContactEmail(userData?.email || "");
      setContactPhone(userData.userDetails?.phoneNumbers?.[0]?.phone || "");
    }

    fetchUser();
  }, [router]);

  // --- Delivery Fetch ---
  async function fetchDelivery(pincodeValue: string) {
    if (!pincodeValue) return;
    setLoadingDelivery(true);
    setDeliveryError(null);
    setRecalculated(false);

    try {
      const res = await fetch(
        `/api/delivery/${encodeURIComponent(pincodeValue)}`
      );
      if (!res.ok) throw new Error("Delivery check failed");
      const data = (await res.json()) as DeliveryResponse;
      setDelivery(data);
      if (data.economy_price) setMethod("economy");
      setRecalculated(true);
    } catch (err) {
      setDeliveryError("Could not connect to delivery service.");
    } finally {
      setLoadingDelivery(false);
    }
  }

  // --- Totals ---
  const cartSubtotal = useMemo(
    () => checkoutData?.totals?.cartSubtotal ?? 0,
    [checkoutData]
  );

  const shippingCost = useMemo(() => {
    if (!delivery || !method) return 0;
    const value =
      method === "economy"
        ? Number(delivery.economy_price ?? 0)
        : Number(delivery.premium_price ?? 0);
    return value;
  }, [delivery, method]);

  const total = useMemo(() => {
    return cartSubtotal + shippingCost + (tailLift ? TAIL_LIFT_COST : 0);
  }, [cartSubtotal, shippingCost, tailLift]);

  // --- Stripe Submit Order ---

  const handleStripePayment = async () => {
    if (!recalculated || !method) {
      alert("Please check delivery before placing your order.");
      return;
    }

    setIsLoading(true);

    // Same payload as bank transfer
    const finalOrderPayload = {
      ...checkoutData,
      contact: { email: contactEmail, phone: contactPhone },
      shippingAddress: { ...shippingAddress, method, tailLift },
      totals: {
        cartSubtotal,
        shippingCost,
        tailLift: tailLift ? TAIL_LIFT_COST : 0,
        total,
        itemPrices: checkoutData?.totals?.itemPrices,
      },
    };

    try {
      // 1️⃣ CREATE ORDER FIRST in Strapi
      const orderRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalOrderPayload),
        credentials: "include",
      });

      if (!orderRes.ok) throw new Error(await orderRes.text());
      const createdOrder = await orderRes.json();
      const orderId = createdOrder.id;

      // 2️⃣ Create Stripe session using orderId
      const stripeRes = await fetch("/api/stripe/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          contact: finalOrderPayload.contact,
          totals: finalOrderPayload.totals,
        }),
      });

      const { url, error } = await stripeRes.json();
      if (error) {
        console.error("Payment error:", error);
        return;
      }

      // 3️⃣ Redirect to Stripe checkout
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Submit Order ---

  const handlePlaceOrder = async () => {
    if (!recalculated || !method) {
      alert("Please check delivery before placing your order.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const finalOrderPayload = {
      ...checkoutData,
      contact: { email: contactEmail, phone: contactPhone },
      shippingAddress: { ...shippingAddress, method, tailLift },
      totals: {
        cartSubtotal,
        shippingCost,
        tailLift: tailLift ? TAIL_LIFT_COST : 0,
        total,
        itemPrices: checkoutData?.totals?.itemPrices,
      },
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalOrderPayload),
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      const createdOrder = await res.json();
      sessionStorage.removeItem("checkoutData");
      await fetch("/api/cart", { method: "DELETE", credentials: "include" });
      router.push(`/order/success/${createdOrder.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!checkoutData) return <p className="p-6">Loading checkout...</p>;

  const { items } = checkoutData;

  // console.log(checkoutData.items);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT COLUMN */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
          >
            {/* CONTACT INFO */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold">Contact information</h2>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email address"
                className="w-full mt-2 p-2 border rounded"
                required
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full mt-2 p-2 border rounded"
                required
              />
            </section>
            {/* SHIPPING */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Shipping address</h2>

              {savedAddresses.length > 0 && (
                <div className="mb-4 border rounded-lg p-3">
                  <label className="font-medium block mb-2">
                    Select a saved address:
                  </label>
                  <div className="space-y-2">
                    {savedAddresses.map((addr, i) => (
                      <label
                        key={addr.id}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="savedAddress"
                          value={i}
                          checked={
                            useSavedAddress && selectedAddressIndex === i
                          }
                          onChange={() => {
                            setUseSavedAddress(true);
                            setSelectedAddressIndex(i);
                            setShippingAddress((prev) => ({
                              ...prev,
                              address: addr.address || "",
                              city: addr.city || "",
                              pincode: addr.pincode || "",
                            }));
                            setRecalculated(false);
                          }}
                        />
                        <div>
                          <p className="font-semibold">
                            {addr.label || `Address ${i + 1}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.address}, {addr.city}, {addr.pincode}
                          </p>
                        </div>
                      </label>
                    ))}

                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="radio"
                        name="savedAddress"
                        value="new"
                        checked={!useSavedAddress}
                        onChange={() => {
                          setUseSavedAddress(false);
                          setSelectedAddressIndex(null);
                          setShippingAddress((prev) => ({
                            ...prev,
                            address: "",
                            city: "",
                            pincode: "",
                          }));
                          setRecalculated(false);
                        }}
                      />
                      <span>Add a new address</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Address Inputs */}
              <div
                className={`grid grid-cols-2 gap-4 mt-2 ${
                  useSavedAddress ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <input
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress((p) => ({
                      ...p,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="First name"
                  className="p-2 border rounded"
                  required
                />
                <input
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress((p) => ({
                      ...p,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Last name"
                  className="p-2 border rounded"
                  required
                />
              </div>

              <input
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Address"
                className="w-full mt-4 p-2 border rounded"
                required
                disabled={useSavedAddress}
              />

              <div className="grid grid-cols-3 gap-4 mt-4">
                <input
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="City"
                  className="p-2 border rounded"
                  required
                  disabled={useSavedAddress}
                />
                <select
                  className="p-2 border rounded"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress((p) => ({
                      ...p,
                      country: e.target.value,
                    }))
                  }
                  disabled={useSavedAddress}
                >
                  <option>United Kingdom (UK)</option>
                </select>
                <input
                  value={shippingAddress.pincode}
                  onChange={(e) => {
                    setShippingAddress((p) => ({
                      ...p,
                      pincode: e.target.value,
                    }));
                    setRecalculated(false);
                  }}
                  placeholder="Postcode"
                  className="p-2 border rounded"
                  required
                  disabled={useSavedAddress}
                />
              </div>

              <button
                type="button"
                onClick={() => fetchDelivery(shippingAddress.pincode)}
                disabled={!shippingAddress.pincode || loadingDelivery}
                className="mt-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-400"
              >
                {loadingDelivery ? "Checking..." : "Check Delivery"}
              </button>

              {deliveryError && (
                <p className="text-sm text-red-500 mt-1">{deliveryError}</p>
              )}

              {/* Delivery Options */}
              {delivery && (
                <div className="mt-4 space-y-2">
                  <label className="flex items-center gap-3 border rounded p-3 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="radio"
                      checked={method === "economy"}
                      onChange={() => setMethod("economy")}
                    />
                    <span>
                      Economy Delivery (
                      {currencyFormat(Number(delivery.economy_price ?? 0))})
                    </span>
                  </label>
                  <label className="flex items-center gap-3 border rounded p-3 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="radio"
                      checked={method === "premium"}
                      onChange={() => setMethod("premium")}
                    />
                    <span>
                      Premium Delivery (
                      {currencyFormat(Number(delivery.premium_price ?? 0))})
                    </span>
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
                  <span>Add Tail Lift (+{currencyFormat(TAIL_LIFT_COST)})</span>
                </label>
              </div>
            </section>

            {/* PAYMENT */}
            <section>
              <h2 className="text-lg font-semibold">Payment options</h2>

              <div className="mt-2 border rounded">
                <label className="flex items-center gap-3 p-4 border-b cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                  />
                  Direct bank transfer
                </label>

                <label className="flex items-center gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  Pay Online with Stripe
                </label>
              </div>

              {paymentMethod === "bank" && (
                <p className="p-4 text-sm text-gray-600 bg-gray-50 border">
                  Make payment directly in the bank. Order ships once payment
                  clears.
                </p>
              )}
            </section>

            <div className="mt-6">
              {paymentMethod === "bank" ? (
                <button
                  type="submit"
                  disabled={!recalculated || !method || isLoading}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isLoading ? "Placing Order..." : "Place Order"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStripePayment}
                  disabled={!recalculated || !method || isLoading}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Pay with Stripe
                </button>
              )}

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Product ID: {item.product}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p>{currencyFormat(item.unit_price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-4 pt-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currencyFormat(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{shippingCost ? currencyFormat(shippingCost) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Tail Lift</span>
              <span>{tailLift ? currencyFormat(TAIL_LIFT_COST) : "—"}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <span>Total</span>
              <span>{currencyFormat(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
