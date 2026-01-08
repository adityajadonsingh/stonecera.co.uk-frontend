"use client";

import { useEffect, useState, useCallback } from "react";

const GUEST_WISHLIST_KEY = "wishlist";

export function useWishlist() {
  const [items, setItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD ---------------- */
  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/wishlist");

      if (res.ok) {
        const json = await res.json();
        setItems(Array.isArray(json.data) ? json.data : []);
        return;
      }
    } catch {
      // ignore
    } finally {
      // ⚠️ DO NOT RETURN BEFORE THIS
      setLoading(false);
    }

    // guest fallback
    const local = localStorage.getItem(GUEST_WISHLIST_KEY);
    setItems(local ? JSON.parse(local) : []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ---------------- TOGGLE ---------------- */
  const toggle = useCallback(async (productId: number) => {
    try {
      const res = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const json = await res.json();
        setItems(Array.isArray(json.wishlist) ? json.wishlist : []);
        return;
      }
    } catch {
      // ignore
    }

    // guest toggle
    setItems((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  /* ---------------- MERGE AFTER LOGIN ---------------- */
  const merge = useCallback(async () => {
    const local = localStorage.getItem(GUEST_WISHLIST_KEY);
    const localItems: number[] = local ? JSON.parse(local) : [];

    if (!localItems.length) return;

    const res = await fetch("/api/wishlist/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: localItems }),
    });

    if (res.ok) {
      const json = await res.json();
      setItems(Array.isArray(json.wishlist) ? json.wishlist : []);
      localStorage.removeItem(GUEST_WISHLIST_KEY);
    }
  }, []);

  return {
    items,
    count: items.length,
    has: (id: number) => items.includes(id),
    toggle,
    merge,
    refresh: load,
    loading,
  };
}
