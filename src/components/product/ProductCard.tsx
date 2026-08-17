"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Ruler } from "lucide-react";

import WishlistButton from "../WishlistButton";
import VariationPopup from "@/components/product/VariationPopup";

import type { CategoryProduct } from "@/lib/types";

interface ProductCardProps {
  product: CategoryProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [openPopup, setOpenPopup] = useState(false);

  const selectedVariation = product.selectedVariation;

  if (!selectedVariation) {
    return null;
  }

  const pricing = selectedVariation.pricing;

  const hasDiscount = pricing.isDiscounted;
  const discountPercentage = pricing.discount?.percentage ?? 0;

  const stock = Number(selectedVariation.Stock || 0);

  const thickness = [
    ...new Set(
      product.variations
        ?.map((variation) => variation.Thickness?.replace(/^THICKNESS\s+/i, ""))
        .filter(Boolean) ?? [],
    ),
  ].join(" / ");

  const image = product.product.images?.[0];
  console.log(product);
  return (
    <>
      <Link
        href={`/product/${product.product.slug}/`}
        className="relative block hover:shadow-xl group font-sans"
      >
        {/* Discount Badge */}
        {hasDiscount && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-30 animate-pulse-bg text-white text-xs font-semibold px-2 py-1">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist */}
        <div className="absolute rounded-full flex items-center justify-center bg-[#ffff]/90 backdrop-blur-[1px] hover:bg-[#4c4331] h-[30px] w-[30px] z-10 top-2 right-2">
          <WishlistButton productId={product.product.id} />
        </div>

        {/* Image */}
        <div className="relative w-full h-[400px] overflow-hidden">
  {image ? (
    <Image
      src={process.env.NEXT_PUBLIC_MEDIA_URL + image.url}
      alt={image.alt || product.product.name}
      fill
      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
    />
  ) : (
    <div className="bg-gray-100 h-full flex items-center justify-center text-sm text-gray-400">
      No Image
    </div>
  )}
</div>

        <div className="p-4">
          {/* Name */}
          <div className="min-h-12">
            <h3 className="font-sans text-lg font-bold text-[#262a18] hover:text-[#a67c52] transition-colors leading-tight line-clamp-1">
              {product.product.name}
            </h3>
            <div className="text-[10px] text-gray-400 uppercase font-medium tracking-wider mt-1">
              {selectedVariation.Finish} • {thickness}
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase">
                From
              </span>

              {hasDiscount && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  £{pricing.pack.original.toFixed(2)}
                </span>
              )}

              <span className="text-xl font-bold text-[#a67c52]">
                £{pricing.pack.selling.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Per Pack
              </span>
            </div>

            <div className="flex items-baseline gap-2 font-medium text-gray-500">
              <span className="text-xl font-bold text-[#a67c52]">£{pricing.perM2.selling.toFixed(2)}</span>

              {hasDiscount && (
                <span className="text-gray-400 line-through text-sm">
                  £{pricing.perM2.original.toFixed(2)}
                </span>
              )}
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                / m²
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 uppercase border-gray-200 border-t pt-3">
            {/* Stock */}
            <p
              className={`text-[10px] font-bold ${
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

            {/* Variations */}
            {product.variations?.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenPopup(true);
                }}
                className="flex items-center text-[11px] text-[#4c4331] bg-[#d8c06a] py-2 px-3 cursor-pointer font-medium hover:bg-[#f3db86] gap-x-1"
              >
                <Ruler size={16} />

                <span className="uppercase font-semibold">View all sizes</span>
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Variation Popup */}
      {openPopup && (
        <VariationPopup
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          variations={product.variations}
          name={product.product.name}
          slug={product.product.slug}
        />
      )}
    </>
  );
}
