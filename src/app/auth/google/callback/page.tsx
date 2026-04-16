"use client";

import { useWishlistContext } from "@/context/WishlistContext";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const wishlist = useWishlistContext();
  useEffect(() => {
    async function handleLogin() {
      const params = new URLSearchParams(window.location.search);

      const access_token = params.get("access_token");

      if (!access_token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ access_token }),
        });

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        await wishlist.merge();
        await wishlist.refresh();
        setTimeout(() => {
          window.location.href = "/account";
        }, 100);
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    }

    handleLogin();
  }, []);

  return (
    <div className="min-h-[50vh] flex justify-center items-center">
      <p>Signing in...</p>
    </div>
  );
}
