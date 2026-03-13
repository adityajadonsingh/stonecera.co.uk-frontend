"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation: password2,
        }),
      });

      if (!res.ok) {
        setMessage("Password reset failed.");
        return;
      }

      setMessage("Password updated. Logging you in...");

      window.dispatchEvent(new Event("auth"));

      try {
        localStorage.setItem("auth", String(Date.now()));
      } catch {}

      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } catch {
      setMessage("Unexpected error.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto md:my-16 my-8 p-6 bg-skin rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Reset your password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm block">New password</label>
          <input
            type="password"
            required
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm block">Confirm password</label>
          <input
            type="password"
            required
            className="w-full border rounded p-2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        {message && <div className="text-sm text-red-600">{message}</div>}

        <button
          disabled={loading}
          className="button-1 px-4 py-2 text-white rounded"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
