"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { Category } from "@/lib/types";
import { useAuthUser } from "@/hooks/useAuthUser";

interface Props {
  categories: Category[];
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  categories,
  open,
  onClose,
}: Props) {
  const [catOpen, setCatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, loading } = useAuthUser();

  // Wait until we're on the client before using document.body
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body from scrolling while menu is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Close menu with Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* =========================
          OVERLAY
      ========================== */}
      <div
        onClick={onClose}
        className={`fixed inset-0 transition-opacity duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        style={{
          zIndex: 99998,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`fixed top-0 left-0 h-dvh w-[288px] overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        style={{
          zIndex: 99999,
          backgroundColor: "#ffffff",
          isolation: "isolate",
        }}
      >
        {/* Header */}
        <div className="mb-2 flex items-center justify-between bg-skin px-4 py-3">
          <span className="text-lg font-semibold text-dark">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-sm font-medium text-[#4A3A2A]">
          {/* About */}
          <Link
            href="/about-us"
            onClick={onClose}
            className="block px-4 py-2 hover:bg-[#f7f3eb]"
          >
            About Us
          </Link>

          {/* Categories */}
          <div>
            <button
              type="button"
              onClick={() => setCatOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-center justify-between px-4 py-2 hover:bg-[#f7f3eb]"
            >
              <span>Categories</span>

              {catOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {catOpen && (
              <ul className="space-y-2 text-sm text-gray-700">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/product-category/${cat.slug}`}
                      onClick={onClose}
                      className="block px-6 py-2 hover:bg-[#f7f3eb]"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Products */}
          <Link
            href="/products"
            onClick={onClose}
            className="block px-4 py-2 hover:bg-[#f7f3eb]"
          >
            Products
          </Link>

          {/* Blogs */}
          <Link
            href="/blogs"
            onClick={onClose}
            className="block px-4 py-2 hover:bg-[#f7f3eb]"
          >
            Blogs
          </Link>

          {/* Contact */}
          <Link
            href="/contact-us"
            onClick={onClose}
            className="block px-4 py-2 hover:bg-[#f7f3eb]"
          >
            Contact Us
          </Link>
        </nav>

        {/* Login / Register */}
        {!loading && !user && (
          <div className="mt-4 flex gap-3 px-2">
            <Link
              href="/login"
              onClick={onClose}
              className="w-1/2 rounded bg-[#F7F3EB] py-2 text-center text-[#4A3A2A] transition-colors hover:bg-[#4A3A2A] hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={onClose}
              className="button-logo-1 w-1/2 rounded py-2 text-center text-white"
            >
              Register
            </Link>
          </div>
        )}
      </aside>
    </>,
    document.body
  );
}