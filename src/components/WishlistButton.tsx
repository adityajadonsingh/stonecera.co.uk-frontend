"use client";

import { Heart } from "lucide-react";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistButton({ productId, iconColor="text-gray-500 hover:text-white", size=18 }: { productId: number; iconColor?: string; size?: number }) {
  const wishlist = useWishlistContext(); 
  const active = wishlist.has(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        wishlist.toggle(productId);
      }}
      className="cursor-pointer"
      title="Add to wishlist"
    >
      <Heart
        size={size}
        className={`transition ${
          active ? "fill-red-500 text-red-500" : iconColor
        }`}
      />
    </button>
  );
}
