"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthUser } from "@/hooks/useAuthUser";

type CartItemLocalStorage = {
  product: number;
  variation_id: number;
  quantity: number;
};

type CartItem = {
  id: number;
  quantity: number;
  unit_price?: number;
  product?: any;
  metadata?: any;
  variation?: any;
};

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  isGuest: boolean;
  addToCart: (item: CartItemLocalStorage) => Promise<void>;
  removeFromCart: (variationId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const [items, setItems] = useState<CartItem[]>([]);

  /* ---------------- FETCH GUEST CART DETAILS ---------------- */

  const fetchGuestCart = async () => {
    const stored = localStorage.getItem("guest_cart");
    if (!stored) {
      setItems([]);
      return;
    }

    const parsed: CartItemLocalStorage[] = JSON.parse(stored);

    const res = await fetch("/api/cart/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: parsed }),
    });

    if (!res.ok) return;

    const data = await res.json();
    setItems(data);
  };

  /* ---------------- FETCH AUTH CART ---------------- */

  const fetchBackendCart = async () => {
    if (!user) return;

    const res = await fetch("/api/cart", {
      credentials: "include",
    });

    if (!res.ok) return;

    const data = await res.json();
    setItems(data);
  };

  /* ---------------- LOAD CART ---------------- */

  const refreshCart = async () => {
    if (user) {
      await fetchBackendCart();
    } else {
      await fetchGuestCart();
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  /* ---------------- MERGE CART AFTER LOGIN ---------------- */

  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem("guest_cart");
    if (!stored) return;

    const guestItems: CartItemLocalStorage[] = JSON.parse(stored);

    async function merge() {
      for (const item of guestItems) {
        await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }

      localStorage.removeItem("guest_cart");
      fetchBackendCart();
    }

    merge();
  }, [user]);

  /* ---------------- ADD TO CART ---------------- */

  const addToCart = async (item: CartItemLocalStorage) => {
    if (user) {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      fetchBackendCart();
    } else {
      const stored: CartItemLocalStorage[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]",
      );

      const existing = stored.find(
        (i) =>
          i.product === item.product && i.variation_id === item.variation_id,
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        stored.push(item);
      }

      localStorage.setItem("guest_cart", JSON.stringify(stored));

      fetchGuestCart();
    }
  };

  /* ---------------- REMOVE ITEM ---------------- */

  const removeFromCart = async (variationId: number) => {
    if (user) {
      await fetch(`/api/cart/${variationId}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchBackendCart();
    } else {
      const stored: CartItemLocalStorage[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]",
      );

      const updated = stored.filter((i) => i.variation_id !== variationId);

      localStorage.setItem("guest_cart", JSON.stringify(updated));

      fetchGuestCart();
    }
  };

  /* ---------------- TOTAL QUANTITY ---------------- */

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        isGuest: !user,
        addToCart,
        removeFromCart,
        refreshCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
