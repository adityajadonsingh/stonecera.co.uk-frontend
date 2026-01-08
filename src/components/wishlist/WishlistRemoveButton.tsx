"use client";

import { Trash2 } from "lucide-react";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistRemoveButton({
  productId,
}: {
  productId: number;
}) {
  const wishlist = useWishlistContext();

  return (
    <button
      onClick={() => wishlist.toggle(productId)}
      className="text-red-500 hover:text-red-700 transition cursor-pointer"
      aria-label="Remove from wishlist"
    >
      <Trash2 size={20} />
    </button>
  );
}
