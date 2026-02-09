"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Ruler } from "lucide-react";
import WishlistButton from "../WishlistButton";
import VariationPopup from "@/components/product/VariationPopup";
import type { CategoryProduct } from "@/lib/types";

interface ProductGridProps {
  products: CategoryProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!products?.length) {
    return (
      <p className="text-center text-gray-400 italic mt-10">
        No products found for this category.
      </p>
    );
  }

  return (
    <>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-8">
        {products.map(
          ({ product, selectedVariation, priceBeforeDiscount }, index) => {
            const hasDiscount =
              priceBeforeDiscount &&
              (priceBeforeDiscount.Per_m2 > selectedVariation.Per_m2 ||
                priceBeforeDiscount.Price > selectedVariation.Price);

            const discountPercent =
              product.productDiscount && product.productDiscount > 0
                ? product.productDiscount
                : product.categoryDiscount && product.categoryDiscount > 0
                ? product.categoryDiscount
                : 0;

            const stock = selectedVariation.Stock;
            return (
              <Link
                href={`/product/${product.slug}/`}
                key={product.slug}
                className="relative block shadow-sm rounded-md p-3 bg-skin"
              >
                {hasDiscount && discountPercent > 0 && (
                  <div className="absolute top-2 left-2 z-30 animate-pulse-bg text-white text-xs font-semibold px-2 py-1 rounded">
                    {discountPercent}% OFF
                  </div>
                )}
                {/* Wishlist */}
                <div className="absolute rounded-full flex items-center justify-center bg-[#4c4331]/80 backdrop-blur-[1px] hover:bg-[#4c4331] h-[36px] w-[36px] z-10 top-1 right-1">
                  <WishlistButton productId={product.id} />
                </div>

                {/* Image */}
                <div className="relative aspect-square mb-3 overflow-hidden rounded">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MEDIA_URL + product.images[0].url
                    }
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Name */}
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 min-h-[2rem]">
                  {product.name}
                </h3>

                {/* Pricing */}
                <div className="mt-1 text-sm flex gap-x-3 ">
                  <span className="font-medium text-nowrap">From :</span>
                  <div>
                    <div>
                      {hasDiscount && (
                        <span className="line-through mr-1 text-gray-500">
                          £{priceBeforeDiscount?.Per_m2.toFixed(2)}
                        </span>
                      )}
                      <span className="font-bold text-[#cd9450] mr-1">
                        £{selectedVariation.Per_m2.toFixed(2)}
                      </span>
                      <span className="text-gray-400 font-medium">/ m²</span>
                    </div>
                    {/* Per Pack */}
                    <div>
                      {hasDiscount && (
                        <span className="line-through mr-1 text-gray-500">
                          £{priceBeforeDiscount?.Price.toFixed(2)}
                        </span>
                      )}
                      <span className="mr-2 font-bold text-[#cd9450]">
                        £{selectedVariation.Price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 font-medium">
                        Per Pack
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-2">
                  <p
                    className={`text-xs font-semibold ${
                      stock > 10
                        ? "text-green-400"
                        : stock > 0
                        ? "text-[#cc9450] animate-pulse"
                        : "text-red-500"
                    }`}
                  >
                    {stock > 10
                      ? "In Stock"
                      : stock > 0
                      ? `${stock} stock${stock > 1 ? "s" : ""} left !`
                      : "Out of Stock"}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenIndex(index);
                    }}
                    className="flex items-center text-sm text-gray-600 cursor-pointer font-medium hover:text-[#cc934f] gap-x-1"
                  >
                    <Ruler size={16} />
                    <span className="group-hover:underline">
                      View all sizes
                    </span>
                  </button>
                </div>
              </Link>
            );
          }
        )}
      </section>

      {/* SINGLE POPUP INSTANCE */}
      {openIndex !== null && (
        <VariationPopup
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
          variations={products[openIndex]?.variations}
          name={products[openIndex]?.product.name}
        />
      )}
    </>
  );
}
