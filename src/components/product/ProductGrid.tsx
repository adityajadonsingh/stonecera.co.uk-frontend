"use client";

import ProductCard from "./ProductCard";
import type { CategoryProduct } from "@/lib/types";

interface ProductGridProps {
  products: CategoryProduct[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (!products?.length) {
    return (
      <p className="text-center text-gray-400 italic mt-10">
        No products found for this category.
      </p>
    );
  }

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-8">
      {products.map((product) => (
        <ProductCard
          key={product.product.id}
          product={product}
        />
      ))}
    </section>
  );
}