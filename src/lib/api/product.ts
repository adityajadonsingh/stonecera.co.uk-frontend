// lib/api/product.ts

import { Product } from "../types";

export async function getProductBySlug(slug: string): Promise<Product> {
  try {
    const url = `${process.env.API_URL!}/product/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      cache: "no-store", // server component should always fetch fresh product data
    });
    if (!res.ok) {
      console.error("Error fetching product:", res.status, res.statusText);
      return {} as Product;
    }
    return (await res.json()) as Product;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return {} as Product;
  }
}

export async function getAllProducts(params: {
  limit: number;
  offset: number;
}) {
  const qs = new URLSearchParams({
    limit: String(params.limit),
    page: String(params.offset / params.limit + 1),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${qs.toString()}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
