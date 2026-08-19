"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
interface FAQ {
  question: string;
  answer: string;
}

interface FaqsProps {
  mainHeading: string;
  subHeading: string;
  faqs: FAQ[];
}

export default function FaqsAccordion({
  mainHeading,
  subHeading,
  faqs,
}: FaqsProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <section
      className="border-t py-16"
      style={{
        borderTopColor: "rgba(38, 42, 24, 0.1)",
        borderTopWidth: "0.5px",
        fontFamily: '"Work Sans", sans-serif',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#99a14e]">
              Knowledge Base
            </p>

            <h2
              className="mb-4 font-serif text-3xl leading-tight text-[#262a18]"
              style={{
                fontFamily: '"Instrument Serif", serif',
              }}
            >
              {mainHeading}
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-[#4a5530]">
              {subHeading}
            </p>

            <Link
              href="/contact"
            >
              <button
              type="button"
              className="mt-6 border-b cursor-pointer border-[#d8c06a] pb-0.5 text-xs font-medium text-[#262a18] transition-colors duration-300 hover:text-[#99a14e]"
            >
              Ask a Specialist →
            </button>
            </Link>
          </div>

          {/* FAQ LIST */}
          <div className="lg:col-span-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
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
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left"
                  >
                    <span
                      className={`pr-4 text-sm font-medium leading-snug transition-colors duration-300 ${
                        isOpen
                          ? "text-[#262a18]"
                          : "text-[#262a18] group-hover:text-[#99a14e]"
                      }`}
                    >
                      {faq.question}
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
                        <p className="max-w-3xl text-sm leading-relaxed text-[#4a5530]">
                          {faq.answer}
                        </p>
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
