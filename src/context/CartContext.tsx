"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthUser } from "@/hooks/useAuthUser";

interface CartItem {
  product: number;
  variation_id: number;
  quantity: number;
}

interface BackendCartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  totalQuantity: number;
  guestItems: CartItem[];
  isGuest: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthUser();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [backendItems, setBackendItems] = useState<BackendCartItem[]>([]);

  /* ---------------- LOAD GUEST CART ---------------- */
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("guest_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    }
  }, [user]);

  /* ---------------- FETCH BACKEND CART ---------------- */
  const fetchBackendCart = async () => {
    if (!user) return;

    const res = await fetch("/api/cart");
    if (!res.ok) return;

    const data = await res.json();
    setBackendItems(data);
  };

  useEffect(() => {
    if (user) {
      fetchBackendCart();
    }
  }, [user]);

  /* ---------------- MERGE GUEST → BACKEND ---------------- */
  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem("guest_cart");
    if (!stored) return;

    const guestItems: CartItem[] = JSON.parse(stored);

    async function merge() {
      for (const item of guestItems) {
        await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }

      localStorage.removeItem("guest_cart");
      setCartItems([]);
      fetchBackendCart();
    }

    merge();
  }, [user]);

  /* -------- -------- ADD-TO-CART -------- -------- */
  const addToCart = async (item: CartItem) => {
    if (user) {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      await fetchBackendCart();
    } else {
      const updated = [...cartItems];

      const existing = updated.find(
        (i) =>
          i.product === item.product && i.variation_id === item.variation_id,
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        updated.push(item);
      }

      setCartItems(updated);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  /* -------- -------- COUNTER -------- -------- */
  const totalQuantity = user
    ? backendItems.reduce((sum, i) => sum + i.quantity, 0)
    : cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        totalQuantity,
        guestItems: cartItems,
        isGuest: !user,
        addToCart,
        refreshCart: fetchBackendCart,
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
