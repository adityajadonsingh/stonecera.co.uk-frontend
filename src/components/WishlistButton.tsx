"use client";

import { Heart } from "lucide-react";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistButton({ productId }: { productId: number }) {
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
        size={18}
        className={`transition ${
          active ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-white"
        }`}
      />
    </button>
  );
}
