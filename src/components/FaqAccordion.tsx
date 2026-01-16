"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  items,
}: {
  items: FaqItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="faq">
      {/* Heading */}
      <h2 className="text-center text-3xl heading font-bold mb-10">
        FAQ&apos;S
        <span className="block w-20 h-1 bg-[#c98b4c] mx-auto mt-2 rounded-full" />
      </h2>

      <div className="">
        {items.map((item, index) => {
          const isOpen = index === activeIndex;

          return (
            <div
              key={index}
              className={`border-b border-[#e3b27d] transition-colors duration-300 ${
                isOpen ? "bg-[#fff8f1]" : "bg-transparent"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full cursor-pointer flex justify-between items-center py-5 px-4 text-left group"
              >
                <span className="text-lg font-semibold text-[#4c4331] group-hover:text-[#c98b4c] transition-colors duration-300">
                  {item.question}
                </span>

                <span
                  className={`ml-4 text-[#c98b4c] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 leading-relaxed px-4 pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
