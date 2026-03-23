"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWishlistContext } from "@/context/WishlistContext";
import PasswordInput from "./PasswordInput";

type FormState = {
  identifier: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wishlist = useWishlistContext();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowForgot(false);
      }
    }

    if (showForgot) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForgot]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // critical for cookies
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Login failed");
        setError(text);
        return;
      }

      // notify same tab and other tabs
      window.dispatchEvent(new Event("auth"));
      try {
        localStorage.setItem("auth", String(Date.now()));
      } catch {
        /* ignore */
      }

      // revalidate server components (Header etc.)
      router.refresh();
      await wishlist.merge();

      // optional: reload wishlist state
      await wishlist.refresh();

      router.replace("/account");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Login error", err);
      setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setForgotMessage("");

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      setForgotMessage(
        "If an account exists with this email, a reset link has been sent.",
      );
    } catch {
      setForgotMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email or username</label>
          <input
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <PasswordInput
          label="Password"
          value={form.password}
          onChange={(v) => setForm((s) => ({ ...s, password: v }))}
          required
        />
        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-sm cursor-pointer text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 button-1 text-white rounded"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
      
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg w-[400px] shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-3">Reset your password</h2>

            {!forgotMessage ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />

                <button className="button-1 px-4 py-2 cursor-pointer text-white rounded w-full">
                  Send reset link
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-700">{forgotMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
