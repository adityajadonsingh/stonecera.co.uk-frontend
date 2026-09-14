"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Mail, MessageSquare, Phone, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Delivery & Logistics",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Please contact our team with your postcode and product details so we can confirm the expected delivery timeframe for your order.",
      },
      {
        question: "Do you deliver on weekends?",
        answer:
          "Please contact our team to confirm whether weekend delivery is available for your location and order.",
      },
      {
        question: "How are the stones delivered?",
        answer:
          "Delivery arrangements can vary depending on the product and destination. Please contact us for details about how your particular order will be delivered.",
      },
    ],
  },
  {
    title: "Products & Quality",
    items: [
      {
        question: "Is natural stone slippery when wet?",
        answer:
          "The slip characteristics of natural stone can vary depending on the stone type, surface finish, installation and conditions. Please contact us if you need advice for a specific product.",
      },
      {
        question: "Will the colour of the stone fade?",
        answer:
          "Natural stone has its own natural colour variation and appearance. The long-term appearance can depend on the specific stone, environment, installation and maintenance.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Please contact our team for the current returns and refunds policy and to discuss your specific order.",
      },
    ],
  },
];

export default function FaqContent() {
  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return faqCategories;
    }

    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.question.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [search]);

  const toggleItem = (question: string) => {
    setOpenItem((current) => (current === question ? null : question));
  };

  return (
    <>
      
      {/* =========================
          HERO / SEARCH
      ========================== */}
      <div className="mb-16 text-center">
        <h1
          className="mb-6 font-serif text-5xl text-[#262a18] lg:text-7xl"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          How can we help?
        </h1>

        <div className="relative mx-auto max-w-xl">
          <Search
            size={24}
            strokeWidth={1.5}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenItem(null);
            }}
            placeholder="Search for answers..."
            aria-label="Search frequently asked questions"
            className="h-14 w-full rounded-none border border-stone-200 bg-white pl-12 pr-4 text-lg text-[#262a18] outline-none transition-colors placeholder:text-stone-400 focus:border-[#99a14e] focus:ring-2 focus:ring-[#99a14e]/20"
          />
        </div>
      </div>

      {/* =========================
          FAQ CATEGORIES
      ========================== */}
      <div className="space-y-12">
        {filteredCategories.map((category) => (
          <section key={category.title}>
            <h2 className="mb-6 border-b border-stone-100 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#99a14e]">
              {category.title}
            </h2>

            <div className="w-full">
              {category.items.map((item) => {
                const isOpen = openItem === item.question;

                return (
                  <div
                    key={item.question}
                    className="border-b border-stone-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.question)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-medium text-[#262a18] transition-colors hover:text-[#99a14e]"
                    >
                      <span>{item.question}</span>

                      <ChevronDown
                        size={16}
                        strokeWidth={1.8}
                        className={`shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pr-8 text-sm leading-7 text-stone-500">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* No search results */}
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center">
            <Search
              size={32}
              strokeWidth={1.5}
              className="mx-auto mb-4 text-stone-300"
            />

            <h2 className="mb-2 text-lg font-semibold text-[#262a18]">
              No answers found
            </h2>

            <p className="text-sm text-stone-500">
              Try searching with a different term.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          CONTACT CARDS
      ========================== */}
      <div className="mt-24 grid gap-8 md:grid-cols-3">
        {/* Phone */}
        <div className="flex flex-col items-center border border-stone-200 bg-white p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f5f0e8]">
            <Phone size={24} strokeWidth={1.8} className="text-[#99a14e]" />
          </div>

          <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#99a14e]">
            Call Us
          </h3>

          <p
            className="mb-1 font-serif text-xl text-[#262a18]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            44 333 242 0255
          </p>

          <p className="text-xs text-[#4a5530]">Mon-Fri, 8am - 6pm</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center border border-stone-200 bg-white p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f5f0e8]">
            <Mail size={24} strokeWidth={1.8} className="text-[#99a14e]" />
          </div>

          <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#99a14e]">
            Email Us
          </h3>

          <p
            className="mb-1 break-all font-serif text-xl text-[#262a18]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            info@stonecera.co.uk
          </p>

          <p className="text-xs text-[#4a5530]">Response within 24h</p>
        </div>

        {/* Live Chat */}
        <div className="flex flex-col items-center border border-stone-200 bg-white p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f5f0e8]">
            <MessageSquare
              size={24}
              strokeWidth={1.8}
              className="text-[#99a14e]"
            />
          </div>

          <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#99a14e]">
            Live Chat
          </h3>

          <p
            className="mb-1 font-serif text-xl text-[#262a18]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Chat Now
          </p>

          <p className="text-xs text-[#4a5530]">Available 9am - 5pm</p>
        </div>
      </div>
    </>
  );
}
