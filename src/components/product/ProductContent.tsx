"use client";

import {
  Award,
  CheckCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";
import type { ProductContent as ProductContentType } from "@/lib/types";

interface Props {
  content: ProductContentType | null;
}

const deliveryInfo = [
  "Free delivery is available in many UK mainland areas",
  "A small surcharge may apply depending on your location",
  "Remote areas may have higher delivery charges",
  "Kerbside delivery via pallet network",
  "Delivery usually within 2-4 working days",
  "Please ensure access for large delivery vehicles",
];

function RichText({ content }: { content?: string | null }) {
  if (!content) return null;

  return (
    <div
      className="
        prose
        prose-sm
        max-w-none
        text-[#29486f]
        prose-p:mb-4
        prose-p:last-child:mb-0
        prose-strong:text-[#111]
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function HighlightIcon({ icon }: { icon: string }) {
  if (icon === "Award") {
    return (
      <Award size={20} strokeWidth={2} className="shrink-0 text-[#a67c52]" />
    );
  }

  return (
    <ShieldCheck
      size={20}
      strokeWidth={2}
      className="shrink-0 text-[#a67c52]"
    />
  );
}

export default function ProductContent({ content }: Props) {
  if (!content) return null;

  return (
    <div className="space-y-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 prose prose-stone max-w-none">
          {/* INTRO */}
          {content.introContent && (
            <div className="mb-6 text-lg text-[#262a18]">
              <RichText content={content.introContent} />
            </div>
          )}

          {/* HIGHLIGHT CARDS */}
          {content.highlightCards?.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {content.highlightCards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  className="
                rounded-xl
                bg-white
                p-6
                shadow-sm
              "
                >
                  {/* CARD HEADER */}
                  <div className="mb-5 flex items-center gap-3">
                    <HighlightIcon icon={card.icon} />

                    <h5 className="text-sm font-semibold uppercase tracking-wide text-[#262a18]">
                      {card.title}
                    </h5>
                  </div>

                  {/* POINTS */}
                  <div className="space-y-3 pointers">
                    {card.points?.map((item, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <CheckCircle
                          size={15}
                          strokeWidth={2}
                          className="mt-1 shrink-0 text-[#a67c52]"
                        />

                        <div className="text-sm  text-[#29486f]">
                          <RichText content={item.point} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CLOSING CONTENT */}
          {content.closingContent && (
            <div className="text-[15px] leading-7">
              <RichText content={content.closingContent} />
            </div>
          )}
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl bg-[#262a18] p-6 text-white">
            {/* Heading */}
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <Truck size={18} strokeWidth={2} className="text-[#a67c52]" />
              Delivery Information
            </h4>

            {/* Delivery points */}
            <ul className="space-y-2.5">
              {deliveryInfo.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-300"
                >
                  <CheckCircle2
                    size={14}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-[#a67c52]"
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Note */}
            <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-gray-400">
              <span className="font-semibold text-[#a67c52]">*</span> Delivery
              charges and times may vary depending on postcode and product type.
            </p>

            {/* Shipping policy */}
            <Link
              href="/shipping-policy"
              className="
    mt-4
    inline-block
    text-[11px]
    font-bold
    uppercase
    tracking-wider
    text-[#a67c52]
    transition-colors
    hover:text-[#d8c06a]
    hover:underline
  "
            >
              Read Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
