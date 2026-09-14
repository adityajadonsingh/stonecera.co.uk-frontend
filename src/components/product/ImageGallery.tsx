// components/product/ImageGallery.tsx
"use client";

import type { ImageAttributes, Product } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Search } from "lucide-react";
import WishlistButton from "../WishlistButton";
import Breadcrum from "../Breadcrum";

export default function ImageGallery({
  images = [],
  productId,
  product,
}: {
  images: ImageAttributes[];
  productId: number;
  product: Product;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const selectedThumbRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (index >= images.length) setIndex(Math.max(0, images.length - 1));
  }, [images, index]);

  useEffect(() => {
    const btn = selectedThumbRef.current;
    const container = thumbsRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    if (btnRect.left < contRect.left || btnRect.right > contRect.right) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [index]);

  const base = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const main = images[index];

  const slides = images
    .filter((img) => img?.url)
    .map((img) => ({
      src: base + img.url,
      alt: img.alt ?? "Product image",
    }));

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    if (e.key === "ArrowRight")
      setIndex((i) => Math.min(images.length - 1, i + 1));
  };

  return (
    <>
      <nav className="text-sm text-gray-500 mb-3 lg:hidden">
        {/* Home / {product.category?.name ?? "Category"} / {product.name} */}
        <Breadcrum
          breadcrum={[
            {
              pageName: "Product Category",
              pageUrl: "/product-category/",
            },
            {
              pageName: product.category?.name,
              pageUrl: `/product-category/${product.category?.slug}/`,
            },
            {
              pageName: product.name,
              pageUrl: `/product-category/${product.category?.slug}/${product.slug}/`,
            },
          ]}
        />
      </nav>
      <div className="lg:sticky lg:top-[18%] lg:left-0 lg:w-full md:w-3/6 sm:w-5/6 lg:m-0 mx-auto mt-5">
        {/* Main image */}
        <div
          className="
    relative w-full rounded overflow-hidden
    sm:h-[40vh] h-[40vh]
    md:aspect-[4/3] md:h-auto
    lg:h-[60vh]
    xl:h-[55vh]
    mb-4 bg-gray-100
  "
          tabIndex={0}
          onKeyDown={onKey}
        >
          <div className="absolute rounded-full flex items-center justify-center bg-[#4c4331]/80 backdrop-blur-[1px] hover:bg-[#4c4331] h-[36px] w-[36px] z-10 top-3 left-3">
            <WishlistButton productId={productId} />
          </div>
          {main?.url ? (
            <>
              <Image
                src={base + main.url}
                alt={main.alt ?? "Product image"}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw"
                className="object-cover w-full h-full"
                priority
              />

              {/* 🔍 Magnifying glass */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open image gallery"
                className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
              >
                <Search size={20} />
              </button>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No image
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto py-1 px-1">
          {images.map((img, i) => {
            const isSelected = i === index;
            return (
              <button
                key={i}
                ref={isSelected ? selectedThumbRef : null}
                onClick={() => setIndex(i)}
                aria-pressed={isSelected}
                aria-label={`View image ${i + 1}`}
                className={`md:w-20 w-14 md:h-20 h-14 rounded overflow-hidden flex-shrink-0 focus:outline-none ${
                  isSelected
                    ? "ring-2 ring-[#cc9450]"
                    : "border border-gray-200"
                }`}
              >
                {img?.url ? (
                  <Image
                    src={base + img.url}
                    alt={img.alt ?? ""}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </button>
            );
          })}
        </div>

        {/*  Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom]}
          on={{
            view: ({ index }) => setIndex(index),
          }}
          zoom={{
            maxZoomPixelRatio: 2.5,
            scrollToZoom: true,
          }}
        />
      </div>
    </>
  );
}
