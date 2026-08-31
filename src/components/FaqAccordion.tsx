"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FAQComponent } from "@/lib/types";

/**
 * Render Strapi CKEditor HTML or normal text.
 *
 * Examples:
 *
 * "Are porcelain tiles suitable for patios?"
 *        ↓
 * renders as normal text
 *
 * "<p>Are porcelain tiles suitable for patios?</p>"
 *        ↓
 * renders as HTML
 */
function RichText({ content }: { content: string }) {
  if (!content) return null;

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  if (!isHtml) {
    return <>{content}</>;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default function FaqsAccordion({
  mainHeading,
  subHeading,
  items,
  isProductPage = false,
}: FAQComponent) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  if (!items?.length) return null;

  return (
    <section
      className={` ${isProductPage ? "border-0 py-8" : "border-t-[0.5px] border-[rgba(38,42,24,0.1)] py-16"}`}
    >
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#99a14e]">
              Knowledge Base
            </p>

            <h4 className="mb-4 font-sans text-3xl leading-tight text-[#262a18]">
              {mainHeading}
            </h4>

            <p className="max-w-md text-sm leading-relaxed text-[#4a5530]">
              {subHeading}
            </p>

            <Link href="/contact-us/">
              <button
                type="button"
                className="mt-6 cursor-pointer border-b border-[#d8c06a] pb-0.5 text-xs font-medium text-[#262a18] transition-colors duration-300 hover:text-[#99a14e]"
              >
                Ask a Specialist →
              </button>
            </Link>
          </div>

          {/* FAQ LIST */}
          <div className="lg:col-span-2">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  className={`border-b border-[#262a18]/10 transition-colors duration-300 ${
                    isOpen
                      ? "border-l-2 border-l-[#d8c06a] bg-[#f5f1e8]"
                      : "border-l-2 border-l-transparent hover:bg-[#faf8f3]"
                  }`}
                >
                  {/* QUESTION */}
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className="group flex w-full  cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left"
                  >
                    <span
                      className={`pr-4 text-sm font-medium leading-snug transition-colors duration-300 ${
                        isOpen
                          ? "text-[#262a18]"
                          : "text-[#262a18] group-hover:text-[#99a14e]"
                      }`}
                    >
                      <RichText content={faq.question} />
                    </span>

                    {/* ROTATING ARROW */}
                    <ChevronDown
                      size={17}
                      strokeWidth={1.5}
                      className={`shrink-0 text-[#99a14e] transition-transform duration-500 ease-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        <div className="max-w-3xl text-sm leading-relaxed text-[#4a5530]">
                          <RichText content={faq.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
