"use client";

import { createContext, useContext } from "react";
import { useWishlist } from "@/hooks/useWishlist";

type WishlistContextType = ReturnType<typeof useWishlist>;

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlist = useWishlist();

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlistContext must be used inside WishlistProvider");
  }
  return ctx;
}
