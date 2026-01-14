"use client";

import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wishlist";

export default function ClientWishlist() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    const ids = local ? JSON.parse(local) : [];

    if (!ids.length) return;

    fetch(`/api/wishlist/products?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((json) => setProducts(json.data || []));
  }, []);

  if (!products.length) return null;

  return (
    <section className="container py-16">
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={`/product/${p.slug}`}
            className="border rounded-md p-3"
          >
            {p.image && (
              <img
                src={process.env.NEXT_PUBLIC_MEDIA_URL + p.image.url}
                alt={p.image.alt || p.name}
                className="aspect-square object-cover rounded mb-2"
              />
            )}
            <p className="text-sm">{p.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
