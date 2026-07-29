"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistIcon() {
  const { count, loading } = useWishlistContext();

  return (
    <Link aria-label="Wishlist" href="/wishlist" className="relative flex flex-col items-center mr-1">
      <Heart size={18} color="#262a18" />
      <span className="sm:block hidden text-[10px]">Wishlist</span>
      {!loading && count > 0 && (
        <span className="absolute -top-2 -right-0 bg-[#d8c06a] text-white text-[8px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
