"use client";

import { useEffect, useState } from "react";
import type { AppUser } from "@/lib/types";

export function useAuthUser() {
  const [user, setUser] = useState<AppUser | null | undefined>(undefined);

  async function fetchUser() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const json = (await res.json()) as AppUser | null;
      setUser(json);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();

    function onAuth() {
      fetchUser();
    }

    window.addEventListener("auth", onAuth);
    window.addEventListener("storage", (e) => {
      if (e.key === "auth") fetchUser();
    });

    return () => {
      window.removeEventListener("auth", onAuth);
    };
  }, []);

  return { user, loading: user === undefined };
}
