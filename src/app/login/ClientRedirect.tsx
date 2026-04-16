"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (token) {
      router.replace("/account");
      router.refresh();
    }
  }, [router]);

  return null;
}