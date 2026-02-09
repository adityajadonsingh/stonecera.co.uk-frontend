"use client";

import { Star } from "lucide-react";
import type { ProductReview } from "@/lib/types";

interface Props {
  reviews?: ProductReview[];
}

export default function ProductReviews({ reviews = [] }: Props) {
  return (
    <section className="md:my-12 my-6">
      <div className="container">
        <div className="md:w-6/12 w-full mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Customer Reviews
          </h2>

          {/* NO REVIEWS */}
          {reviews.length === 0 && (
            <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded">
              No reviews yet. Be the first to review this product.
            </div>
          )}

          {/* REVIEWS LIST */}
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-md p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{r.name}</span>
                  {r.createdAt && (
                    <span className="text-xs text-gray-400">{r.createdAt}</span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={
                        idx < r.stars
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {r.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
