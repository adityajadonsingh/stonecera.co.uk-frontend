"use client";

import Link from "next/link";
import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { Category } from "@/lib/types";
import { useAuthUser } from "@/hooks/useAuthUser";

interface Props {
  categories: Category[];
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ categories, open, onClose }: Props) {
  const [catOpen, setCatOpen] = useState(false);
  const { user, loading } = useAuthUser();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 mb-2 bg-skin">
          <span className="font-semibold text-lg text-dark">Menu</span>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-2 text-sm font-medium text-[#4A3A2A]">
          <Link
            className="block hover:bg-[#f7f3eb] px-4 py-2"
            href="/about-us"
            onClick={onClose}
          >
            About Us
          </Link>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="w-full hover:bg-[#f7f3eb] px-4 py-2 cursor-pointer flex items-center justify-between"
            >
              <span>Categories</span>
              {catOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {catOpen && (
              <ul className=" space-y-2 text-sm text-gray-700">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/product-category/${cat.slug}`}
                      onClick={onClose}
                      className="block py-2 px-6 hover:bg-[#f7f3eb]"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            className="block hover:bg-[#f7f3eb] px-4 py-2"
            href="/products"
            onClick={onClose}
          >
            Products
          </Link>

          <Link
            className="block hover:bg-[#f7f3eb] px-4 py-2"
            href="/blogs"
            onClick={onClose}
          >
            Blogs
          </Link>

          <Link
            className="block hover:bg-[#f7f3eb] px-4 py-2"
            href="/contact-us"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </nav>
        {!loading && !user && (
          <div className="mt-4 px-2 flex gap-3">
            <Link
              href="/login"
              onClick={onClose}
              className="w-1/2 text-center py-2 rounded bg-[#F7F3EB] text-[#4A3A2A] hover:bg-[#4A3A2A] hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={onClose}
              className="w-1/2 text-center py-2 rounded button-logo-1 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
