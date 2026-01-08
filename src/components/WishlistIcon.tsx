"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistIcon() {
  const { count, loading } = useWishlistContext();

  return (
    <Link href="/wishlist" className="relative mr-1">
      <Heart size={24} color="#bd7e40" />

      {!loading && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#bd7e40] text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
