"use client";

import ProductCard from "./ProductCard";
import type { CategoryProduct } from "@/lib/types";

interface ProductGridProps {
  products: CategoryProduct[];
  isProductPage?: boolean;
}

export default function ProductGrid({
  products,
  isProductPage = false,
}: ProductGridProps) {
  if (!products?.length) {
    return (
      <p className="text-center text-gray-400 italic mt-10">
        No products found for this category.
      </p>
    );
  }

  return (
    <section className={`${isProductPage ? "lg:grid-cols-4" : " lg:grid-cols-3"} grid sm:grid-cols-2 md:grid-cols-3 gap-4 my-8`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.product.id}
          product={product}
          priority={index < 3}
        />
      ))}
    </section>
  );
}