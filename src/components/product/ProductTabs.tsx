"use client";

import { useState } from "react";

import ProductContent from "./ProductContent";
import ProductReviews from "./ProductReviews";
import FaqsAccordion from "@/components/FaqAccordion";

import type { Product, FAQComponent } from "@/lib/types";
import ProductReviewForm from "./ProductReviewForm";

interface Props {
  product: Product;
  faqs?: FAQComponent | null;
}

type Tab = "description" | "reviews" | "faqs";

export default function ProductTabs({ product, faqs }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const reviewCount = product.productReviews?.length ?? 0;

  const tabs = [
    {
      id: "description" as const,
      label: "DESCRIPTION",
    },
    {
      id: "reviews" as const,
      label: `REVIEWS (${reviewCount})`,
    },
    {
      id: "faqs" as const,
      label: "PRODUCT FAQS",
    },
  ];

  return (
    <section className="w-full">
      {/* ================= TABS ================= */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                    font-sans
                  relative
                  shrink-0
                  cursor-pointer
                  pb-4
                  text-sm
                  font-bold
                  tracking-widest
                  transition-colors
                  duration-300
                  ${
                    isActive
                      ? "text-[#111]"
                      : "text-[#9aa0aa] hover:text-[#262a18]"
                  }
                `}
              >
                {tab.label}

                {/* Active underline */}
                <span
                  className={`
                    absolute
                    bottom-[-1px]
                    left-0
                    h-[2px]
                    bg-[#a67c52]
                    transition-all
                    duration-300
                    ${isActive ? "w-full" : "w-0"}
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="pt-5">
        {activeTab === "description" && (
          <ProductContent content={product.content} />
        )}

        {activeTab === "reviews" && (
          <div className="grid md:grid-cols-2 gap-5">
            <ProductReviewForm productId={product.id} />
            <ProductReviews reviews={product.productReviews} />
          </div>
        )}

        {activeTab === "faqs" && (
          <FaqsAccordion
            mainHeading={faqs?.mainHeading ?? ""}
            subHeading={faqs?.subHeading ?? ""}
            items={faqs?.items ?? []}
            isProductPage={true}
          />
        )}
      </div>
    </section>
  );
}
