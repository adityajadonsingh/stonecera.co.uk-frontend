// src/lib/api/wishlist.ts

const STRAPI = process.env.NEXT_PUBLIC_API_URL;

export async function getWishlist() {
  const res = await fetch(`${STRAPI}/wishlist`, {
    credentials: "include",
    cache: "no-store",
  });
  return res.json();
}

export async function toggleWishlist(productId: number) {
  const res = await fetch(`${STRAPI}/wishlist/toggle`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function mergeWishlist(items: number[]) {
  const res = await fetch(`${STRAPI}/wishlist/merge`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return res.json();
}