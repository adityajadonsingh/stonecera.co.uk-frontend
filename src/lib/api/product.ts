// lib/api/product.ts

import { CategoryProduct, Product } from "../types";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME)
  : 60;

export async function getProductBySlug(slug: string): Promise<Product> {
  try {
    const url = `${process.env.API_URL!}/product/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
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
  page: number;
  limit: number;
}) {
  const qs = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${qs.toString()}`,
    {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json() as Promise<{
    totalProducts: number;
    products: CategoryProduct[];
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
