// components/product/ImageGallery.tsx
"use client";

import type { ImageAttributes, Product } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import WishlistButton from "../WishlistButton";

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

  // First visible thumbnail
  const [thumbnailStart, setThumbnailStart] = useState(0);

  const base = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const main = images[index];

  /* =========================================================
     KEEP INDEX VALID
  ========================================================= */

  useEffect(() => {
    if (images.length === 0) {
      setIndex(0);
      setThumbnailStart(0);
      return;
    }

    if (index >= images.length) {
      setIndex(images.length - 1);
    }
  }, [images, index]);

  /* =========================================================
     KEEP SELECTED IMAGE VISIBLE IN THUMBNAIL SLIDER
  ========================================================= */

  useEffect(() => {
    if (images.length <= 4) {
      setThumbnailStart(0);
      return;
    }

    // Selected image is before the visible range
    if (index < thumbnailStart) {
      setThumbnailStart(index);
    }

    // Selected image is after the visible range
    else if (index >= thumbnailStart + 4) {
      setThumbnailStart(index - 3);
    }
  }, [index, thumbnailStart, images.length]);

  /* =========================================================
     LIGHTBOX SLIDES
  ========================================================= */

  const slides = images
    .filter((img) => img?.url)
    .map((img) => ({
      src: base + img.url,
      alt: img.alt ?? "Product image",
    }));

  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================= */

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setIndex((i) => Math.max(0, i - 1));
    }

    if (e.key === "ArrowRight") {
      setIndex((i) => Math.min(images.length - 1, i + 1));
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  /* =========================================================
     THUMBNAIL NAVIGATION
  ========================================================= */

  const showPreviousThumbnails = () => {
    setThumbnailStart((prev) => Math.max(0, prev - 1));
  };

  const showNextThumbnails = () => {
    setThumbnailStart((prev) => Math.min(images.length - 4, prev + 1));
  };

  return (
    <>
      <div
        className="
          mx-auto
          mt-5
          w-full
          sm:w-5/6
          md:w-3/6
          lg:sticky
          lg:left-0
          lg:top-[10%]
          lg:m-0
          lg:w-full
        "
      >
        {/* =====================================================
            MAIN IMAGE
        ===================================================== */}

        <div
          tabIndex={0}
          onKeyDown={onKey}
          className="
            group
            relative
            aspect-[4/3]
            w-full
            overflow-hidden
            border
            border-gray-100
            bg-gray-100
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[#99a14e]
          "
        >
          {main?.url ? (
            <>
              {/* Product Image */}

              <Image
                src={base + main.url}
                alt={main.alt ?? product?.name ?? "Product image"}
                width={1200}
                height={900}
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 60vw,
                  45vw
                "
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
                priority
              />

              {/* =================================================
                  WISHLIST
              ================================================= */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/80
                  bg-white
                  transition-transform
                  duration-200
                  hover:scale-110
                "
              >
                <WishlistButton
                  productId={productId}
                  iconColor="text-gray-500"
                  size={22}
                />
              </div>

              {/* =================================================
                  ZOOM
              ================================================= */}

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open product image gallery"
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-100
                  bg-white
                  text-gray-500
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:text-[#262a18]
                "
              >
                <ZoomIn size={22} />
              </button>
            </>
          ) : (
            /* =================================================
               NO IMAGE
            ================================================= */

            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-gray-100
                text-sm
                text-gray-400
              "
            >
              No image available
            </div>
          )}
        </div>

        {/* =====================================================
            THUMBNAILS
        ===================================================== */}

        {images.length > 0 && (
          <div className="relative mt-4 w-full">
            {/* =================================================
                PREVIOUS ARROW
            ================================================= */}

            {images.length > 4 && thumbnailStart > 0 && (
              <button
                type="button"
                onClick={showPreviousThumbnails}
                aria-label="Previous product images"
                className="
                    absolute
                    left-2
                    top-1/2
                    z-10
                    flex
                    h-9
                    w-9
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#262a18]/10
                    bg-[#f5f0e8]/95
                    text-[#262a18]
                    backdrop-blur-sm
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:bg-[#f5f0e8]
                  "
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
            )}

            {/* =================================================
                THUMBNAIL VIEWPORT
            ================================================= */}

            <div className="grid w-full grid-cols-4 gap-3 overflow-hidden">
              {images
                .slice(thumbnailStart, thumbnailStart + 4)
                .map((img, visibleIndex) => {
                  const actualIndex = thumbnailStart + visibleIndex;

                  const isSelected = actualIndex === index;

                  return (
                    <button
                      key={actualIndex}
                      type="button"
                      onClick={() => setIndex(actualIndex)}
                      aria-pressed={isSelected}
                      aria-label={`View product image ${actualIndex + 1}`}
                      className={`
            group
            relative
            aspect-square
            min-w-0
            overflow-hidden
            bg-gray-100
            outline-none
            transition-all
            duration-300
            ${isSelected ? "opacity-100" : "opacity-60 hover:opacity-100"}
            focus-visible:ring-2
            focus-visible:ring-[#99a14e]
          `}
                    >
                      {img?.url ? (
                        <Image
                          src={base + img.url}
                          alt={img.alt ?? `Product image ${actualIndex + 1}`}
                          width={300}
                          height={300}
                          className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                    </button>
                  );
                })}
            </div>

            {/* =================================================
                NEXT ARROW
            ================================================= */}

            {images.length > 4 && thumbnailStart + 4 < images.length && (
              <button
                type="button"
                onClick={showNextThumbnails}
                aria-label="Next product images"
                className="
                    absolute
                    right-2
                    top-1/2
                    z-10
                    flex
                    h-9
                    w-9
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#262a18]/10
                    bg-[#f5f0e8]/95
                    text-[#262a18]
                    backdrop-blur-sm
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:bg-[#f5f0e8]
                  "
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}

        {/* =====================================================
            LIGHTBOX
        ===================================================== */}

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom]}
          on={{
            view: ({ index }) => {
              setIndex(index);
            },
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
