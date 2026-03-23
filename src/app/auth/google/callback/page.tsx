"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function handleGoogleLogin() {
      const accessToken = params.get("access_token");
      console.log("🔥 ACCESS TOKEN:", accessToken);

      if (!accessToken) {
        console.error("No access token found");
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

        const data = await res.json();
        console.log("🔥 RESPONSE STATUS:", res.status);
        console.log("🔥 RESPONSE DATA:", data);
        console.log("SET-COOKIE HEADER:", res.headers.get("set-cookie"));

        if (!res.ok) {
          console.error("Google login failed:", data);
          router.push("/login");
          return;
        }

        // ✅ IMPORTANT — trigger auth refresh
        window.dispatchEvent(new Event("auth"));
        localStorage.setItem("auth", String(Date.now()));

        router.replace("/account");
      } catch (err) {
        console.error("Google login error:", err);
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
