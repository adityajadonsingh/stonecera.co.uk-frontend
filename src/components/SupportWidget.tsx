"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  ChevronRight,
  MessageCircle,
  MessageSquare,
  Phone,
  X,
} from "lucide-react";

declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      maximize?: () => void;
      onLoad?: () => void;
      onChatMinimized?: () => void;
      onChatHidden?: () => void;
      onChatEnded?: () => void;
    };
  }
}

interface SupportWidgetProps {
  whatsappNumber?: string;
}

export default function SupportWidget({
  whatsappNumber = "447467648124",
}: SupportWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        supportRef.current &&
        !supportRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const openLiveChat = () => {
    setIsOpen(false);

    if (window.Tawk_API?.showWidget) {
      window.Tawk_API.showWidget();
    }

    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Stonecera, I need some help with my stone project.",
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      {/* Tawk configuration */}
      <Script id="tawk-config" strategy="afterInteractive">
        {`
          window.Tawk_API = window.Tawk_API || {};

          // Hide Tawk's own floating button when the widget is minimized
          window.Tawk_API.onChatMinimized = function () {
            window.Tawk_API.hideWidget();
          };

          // Hide Tawk's own floating button when the widget is hidden
          window.Tawk_API.onChatHidden = function () {
            window.Tawk_API.hideWidget();
          };

          // Hide Tawk's own floating button when the chat ends
          window.Tawk_API.onChatEnded = function () {
            window.Tawk_API.hideWidget();
          };
        `}
      </Script>

      {/* Tawk script */}
      <Script
        src="https://embed.tawk.to/69ba42b678528f1c35000b38/1jjvp96mr"
        strategy="lazyOnload"
      />

      {/* Stonecera Support Widget */}
      <div ref={supportRef} className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">
        {/* Support Menu */}
        <div
          className={`absolute bottom-[72px] right-0 w-[285px] origin-bottom-right transition-all duration-300 ease-out ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0"
          }`}
        >
          <div className="overflow-hidden border border-[#d8c06a]/30 bg-[#f5f0e8] shadow-[0_20px_60px_rgba(38,42,24,0.18)]">
            {/* Header */}
            <div className="bg-[#262a18] px-5 py-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#d8c06a]">
                Stonecera Support
              </p>

              <h3
                className="mt-1 font-serif text-xl text-[#f5f0e8]"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                }}
              >
                How can we help?
              </h3>
            </div>

            <div className="p-2">
              {/* Live Chat */}
              <button
                type="button"
                onClick={openLiveChat}
                className="group flex cursor-pointer w-full items-center gap-4 px-3 py-4 text-left transition-colors duration-200 hover:bg-[#ebe5d8]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#262a18] text-[#d8c06a]">
                  <MessageSquare size={18} strokeWidth={1.5} />
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#262a18]">
                    Live Chat
                  </span>

                  <span className="mt-0.5 block text-xs text-[#4a5530]">
                    Speak with a stone specialist
                  </span>
                </span>

                <ChevronRight
                  size={16}
                  className="text-[#99a14e] transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={openWhatsApp}
                className="group cursor-pointer flex w-full items-center gap-4 px-3 py-4 text-left transition-colors duration-200 hover:bg-[#ebe5d8]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#99a14e] text-[#f5f0e8]">
                  <MessageCircle size={18} strokeWidth={1.5} />
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#262a18]">
                    WhatsApp
                  </span>

                  <span className="mt-0.5 block text-xs text-[#4a5530]">
                    Send us your project details
                  </span>
                </span>

                <ChevronRight
                  size={16}
                  className="text-[#99a14e] transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Phone */}
              <a
                href="tel:+443332420255"
                className="group flex items-center gap-4 px-3 py-4 text-left transition-colors duration-200 hover:bg-[#ebe5d8]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#d8c06a] text-[#262a18]">
                  <Phone size={17} strokeWidth={1.5} />
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#262a18]">
                    Call us
                  </span>

                  <span className="mt-0.5 block text-xs text-[#4a5530]">
                    44 333 242 0255
                  </span>
                </span>

                <ChevronRight
                  size={16}
                  className="text-[#99a14e] transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Main Stonecera Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close support options" : "Open support options"}
          aria-expanded={isOpen}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c06a]/40 bg-[#262a18] text-[#d8c06a] shadow-[0_8px_30px_rgba(38,42,24,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#30351e] cursor-pointer"
        >
          {isOpen ? (
            <X size={21} strokeWidth={1.5} />
          ) : (
            <MessageCircle size={22} strokeWidth={1.5} />
          )}

          {!isOpen && (
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-[#f5f0e8] bg-[#d8c06a]" />
          )}
        </button>
      </div>
    </>
  );
}
