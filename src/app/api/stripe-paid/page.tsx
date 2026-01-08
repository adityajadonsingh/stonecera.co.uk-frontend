"use client";

import { useEffect } from "react";

export default function StripePaidPage() {
  useEffect(() => {
    async function getOrderId() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) return;

      const res = await fetch(`/api/stripe/get-order?session_id=${sessionId}`);
      const data = await res.json();

      if (data?.orderId) {
        // Clear cart
        sessionStorage.removeItem("checkoutData");
        await fetch("/api/cart", { method: "DELETE", credentials: "include" });

        window.location.href = `/order/success/stripe/${data.orderId}`;
      }
    }

    getOrderId();
  }, []);

  return <p className="p-10">Processing your order...</p>;
}
