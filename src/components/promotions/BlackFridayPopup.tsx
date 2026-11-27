
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "Cloud Grey Wall Cladding Corner",
    href: "/product/cloud-grey-wall-cladding-corner/",
  },
  {
    name: "Dark Grey Wall Cladding Corner",
    href: "/product/dark-grey-wall-cladding-corner/",
  },
  {
    name: "Golden Wall Cladding Corner",
    href: "/product/golden-wall-cladding-corner/",
  },
  {
    name: "Dark Grey Limestone Paving",
    href: "/product/dark-grey-limestone-paving/",
  },
  {
    name: "County Lgy Porcelain Plank",
    href: "/product/county-lgy-porcelain-plank/",
  },
  {
    name: "Buff Porcelain",
    href: "/product/buff-porcelain/",
  },
  {
    name: "Kandla Grey Porcelain",
    href: "/product/kandla-grey-porcelain/",
  },
  {
    name: "Raj Green Porcelain",
    href: "/product/raj-green-porcelain/",
  },
];


const STORAGE_KEY = "stonecera-black-friday-last-shown";

export default function BlackFridayPopup() {
  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  // Use UK date because this is a UK campaign.
  const getUKDate = () =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

  const today = getUKDate();

  // Campaign runs from 27 November to 25 December inclusive.
  if (today < "2026-11-27" || today > "2026-12-25") {
    return;
  }

  // Already displayed today? Don't display again.
  const lastShown = localStorage.getItem(STORAGE_KEY);

  if (lastShown === today) return;

  const timer = window.setTimeout(() => {
    // Save the date as soon as the popup appears.
    localStorage.setItem(STORAGE_KEY, today);
    setIsOpen(true);
  }, 3500);

  return () => window.clearTimeout(timer);
}, []);

const closePopup = () => {
  setIsOpen(false);
};

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center
      justify-center bg-black/70 p-3 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="black-friday-title"
        className="relative w-full max-w-4xl max-h-[92vh]
        overflow-y-auto rounded-2xl bg-[#f7f5f0] shadow-2xl"
      >
        {/* Hero */}
        <div
          className="relative flex min-h-[270px] flex-col
          justify-center bg-cover bg-center px-7 py-10
          text-white sm:px-12"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(12,15,15,.95), rgba(12,15,15,.35)), url('/media/promotions/stonecera-black-friday.webp')",
          }}
        >
          <button
            onClick={closePopup}
            aria-label="Close promotion"
            className="absolute right-4 top-4 flex h-9 w-9
            items-center justify-center rounded-full
            bg-white/15 text-2xl hover:bg-white/30"
          >
            ×
          </button>

          <p className="mb-3 text-xs font-semibold tracking-[.3em]
          text-[#d9bd82]">
            STONECERA EXCLUSIVE OFFER
          </p>

          <h2
            id="black-friday-title"
            className="text-4xl font-bold leading-tight
            sm:text-6xl"
          >
            BLACK FRIDAY
          </h2>

          <p className="mt-2 text-2xl font-light sm:text-3xl">
            Up to a better outdoor space.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-5xl font-bold text-[#dfc18a]">
              10%
            </span>
            <span className="text-xl font-semibold">
              OFF SELECTED PRODUCTS
            </span>
          </div>

          <p className="mt-4 text-sm text-white/80">
            Offer ends 25 December 2026
          </p>
        </div>

        {/* Products */}
        <div className="px-5 py-7 sm:px-10">
          <div className="mb-5 text-center">
            <h3 className="text-xl font-bold text-[#242b29]">
              Explore Our Special Offers
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Enjoy 10% off selected natural stone and
              porcelain collections.
            </p>
          </div>

          <div
            id="eligible-products"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                onClick={closePopup}
                className="flex items-center justify-between gap-3
                rounded-lg border border-[#e5e0d6] bg-white
                p-4 transition hover:border-[#a88b55]
                hover:shadow-md"
              >
                <span className="text-sm font-medium text-[#303633]">
                  {product.name}
                </span>

                <span className="shrink-0 rounded bg-[#26332e]
                px-2 py-1 text-xs font-bold text-[#e8d09b]">
                  -10%
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/products/"
              onClick={closePopup}
              className="inline-flex items-center justify-center
              rounded-md bg-[#26332e] px-9 py-3
              text-sm font-semibold text-white
              transition hover:bg-[#394b43]"
            >
              EXPLORE OUR COLLECTION
            </Link>

            <p className="mt-4 text-xs text-gray-500">
              Selected products and eligible variations only.
              Offer valid until 25 December 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
