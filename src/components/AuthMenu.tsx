"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppUser } from "@/lib/types";

export default function AuthMenu({ user }: { user: AppUser }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const avatarUrl = user.userDetails?.profileImage?.url ?? "/media/user.png";
  const displayName =
    user.userDetails?.firstName ?? user.username ?? user.email ?? "User";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
      >
        <Image
          src={avatarUrl}
          alt={displayName}
          width={32}
          height={32}
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="text-sm font-medium color-logo-1 md:block hidden">
          {displayName}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg z-[999]">
          <Link
            href="/account"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={async () => {
              await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
              });
              window.dispatchEvent(new Event("auth"));
              localStorage.setItem("auth", String(Date.now()));
              router.refresh();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
