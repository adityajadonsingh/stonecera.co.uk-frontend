"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Metadata } from "next";

export interface FaqItem {
  question: string;
  answer: string;
}

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Stonecera",
  description: "Frequently Asked Questions ( FAQ's ).",
  alternates: {
    canonical: "https://stonecera.co.uk/faqs",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const faqData = [
  {
    question: "Do you offer split packs?",
    answer:
      "At present, we do not offer split packs. Our products are packed in full crates or boxes to ensure safety during transport and maintain product consistency. This also helps prevent colour variation, breakage, and wastage that can occur when handling smaller quantities.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "The minimum order quantity varies depending on the product type. For most paving and stone slab products, the minimum order is typically one full crate, unless stated otherwise on the product page. For accessories or smaller items, please refer to individual product listings for minimum quantities or feel free to contact us directly.",
  },
  {
    question: "What are the delivery charges? ",
    answer:
      "Delivery charges are calculated based on: - The weight and size of your order - The delivery postcode - The delivery method (standard or express) All delivery costs will be clearly mentioned at the time of quotation or checkout. You can also request a delivery estimate by emailing support@stonecera.co.uk with your postcode and product details. ",
  },
  {
    question: "Do you offer deliveries on weekends? ",
    answer:
      "Saturday deliveries may be available in select locations for an additional charge. Please note that weekend deliveries are not standard and must be arranged in advance with our logistics team. We do not deliver on Sundays or bank holidays.",
  },
  {
    question: "How can I contact StoneCera?",
    answer:
      "You can reach us through the following channels: StoneCera - Customer Support Team Email: support@stonecera.co.uk Phone: +44 7467648124 Address: 21 high street, Harrow on the hill, Middlesex, England, HA13HT",
  },
];

export default function FaqsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="container md:py-16 py-8">
      <div className="faq">
        {/* Heading */}
        <h2 className="text-center text-3xl heading font-bold mb-10">
          Frequently Asked Questions
          {/* <span className="block w-20 h-1 bg-[#c98b4c] mx-auto mt-2 rounded-full" /> */}
        </h2>

        <div className="">
          {faqData.map((item, index) => {
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
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
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
    </div>
  );
}
