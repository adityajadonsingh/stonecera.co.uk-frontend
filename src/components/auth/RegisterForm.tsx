"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const router = useRouter();

  const validate = () => {
    if (!email || !password || !username) {
      setError("Please fill all required fields.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowVerifyPopup(false);
      }
    }

    if (showVerifyPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVerifyPopup]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message ?? "Registration failed");
        setLoading(false);
        return;
      }

      // Instead of redirecting, show verification popup
      setShowVerifyPopup(true);
      setLoading(false);
    } catch (err) {
      console.error("Register error:", err);
      setError("Unexpected server error");
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-skin p-6 rounded shadow-sm"
      >
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Confirm Password
          </span>
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 button-1 text-white rounded"
        >
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>

      {/* EMAIL VERIFICATION POPUP */}
      {showVerifyPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-black/50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg max-w-md text-center shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">Verify your email</h2>

            <p className="text-gray-600 mb-4">
              We've sent a verification link to <b>{email}</b>. Please check
              your inbox and verify your account before logging in.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 button-1 text-white rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
