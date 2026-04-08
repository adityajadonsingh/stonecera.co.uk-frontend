// File: src/app/auth/google/callback/GoogleCallbackClient.tsx

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function handleGoogleLogin() {
      const accessToken = params.get("access_token");
      console.log(accessToken);
      if (!accessToken) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ access_token: accessToken }),
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        window.dispatchEvent(new Event("auth"));
        localStorage.setItem("auth", String(Date.now()));

        router.replace("/account");
      } catch (err) {
        router.push("/login");
      }
    }

    handleGoogleLogin();
  }, [params, router]);

  return (
    <div className="flex justify-center items-center h-[40vh]">
      <p className="text-gray-600">Signing you in with Google...</p>
    </div>
  );
}