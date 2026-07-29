// components/UserDropdown.tsx
"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex pointer-cursor flex-col items-center justify-center rounded-full  transition"
      >
        <User size={18} color="#262a18" />
        <span className="block text-[10px]">Account</span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-44  border-[#262A1833] border-[1px] bg-white shadow-lg transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <Link
          href="/login"
          className="block px-4 py-3 text-sm hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="block px-4 py-3 text-sm hover:bg-gray-100"
        >
          Register
        </Link>
      </div>
    </div>
  );
}