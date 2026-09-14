"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProductGrid from "@/components/product/ProductGrid";
import { useWishlistContext } from "@/context/WishlistContext";

import type { CategoryProduct } from "@/lib/types";

export default function WishlistClient({
  initialItems,
}: {
  initialItems: CategoryProduct[] | null;
}) {
  const wishlist = useWishlistContext();

  const [items, setItems] = useState<CategoryProduct[]>(
    initialItems ?? [],
  );

  const [loading, setLoading] = useState(false);

  const wishlistKey = useMemo(
    () => [...wishlist.items].sort((a, b) => a - b).join(","),
    [wishlist.items],
  );

  useEffect(() => {
    if (!wishlistKey) {
      setItems([]);
      return;
    }

    const loadWishlistProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/wishlist/products?ids=${wishlistKey}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          setItems([]);
          return;
        }

        const data = await res.json();

        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Failed to load wishlist products:",
          error,
        );

        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlistProducts();
  }, [wishlistKey]);

  // ============================================================
  // EMPTY
  // ============================================================

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

  // ============================================================
  // LOADING
  // ============================================================

  if (loading && !items.length) {
    return (
      <p className="text-center text-gray-400 italic mt-10">
        Loading wishlist...
      </p>
    );
  }

  // ============================================================
  // PRODUCTS
  // ============================================================

  return (
    <ProductGrid
      products={items}
      isProductPage
    />
  );
}