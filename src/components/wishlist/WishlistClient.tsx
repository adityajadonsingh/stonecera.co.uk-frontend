"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WishlistRemoveButton from "./WishlistRemoveButton";
import { Product } from "@/lib/types";
import { useWishlistContext } from "@/context/WishlistContext";

export default function WishlistClient({
  initialItems,
}: {
  initialItems: Product[] | null;
}) {
  const wishlist = useWishlistContext();
  const [items, setItems] = useState<Product[]>(initialItems ?? []);
  const [loading, setLoading] = useState(false);

  /* 🔒 STABLE DEPENDENCY */
  const wishlistKey = useMemo(
    () => wishlist.items.sort((a, b) => a - b).join(","),
    [wishlist.items]
  );

  useEffect(() => {
    if (!wishlistKey) {
      setItems([]);
      return;
    }

    setLoading(true);

    fetch(`/api/wishlist/products?ids=${wishlistKey}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, [wishlistKey]); // ✅ STABLE

  /* ---------- EMPTY ---------- */
  if (!items.length && !loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500 mb-4">
          Your wishlist is empty
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#6b6257] text-white px-6 py-3 rounded hover:bg-[#5b534a]"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded shadow-sm grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr] gap-4 items-center p-4"
        >
          {/* Image */}
          <div className="relative h-[100px]">
            {item.image?.url && (
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_URL + item.image.url}
                alt={item.image.alt || item.name}
                fill
                className="object-contain"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-medium">{item.name}</h3>
            {item.category && (
              <p className="text-sm text-gray-500">
                {item.category.name}
              </p>
            )}
          </div>

          {/* View */}
          <Link
            href={`/product/${item.slug}`}
            className="bg-[#6b6257] text-white px-5 py-2 rounded text-center"
          >
            View
          </Link>

          {/* Remove */}
          <div className="flex justify-center">
            <WishlistRemoveButton productId={item.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
