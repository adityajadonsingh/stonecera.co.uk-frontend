"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  productId: number;
}

export default function ProductReviewForm({ productId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [website, setWebsite] = useState(""); // honeypot

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setFeedback("");
    setStars(0);
    setWebsite("");
  };

  const submit = async () => {
    if (!name || !email || !feedback || stars === 0) {
      setError("Please fill all fields and select a rating.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/product-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          feedback,
          stars,
          product: productId,
          website,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setSuccess(true);
      resetForm();

      // auto-hide success after 4s
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 mb-12">
      <div className="container">
        <div className="md:w-6/12 w-full mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Leave a Review
          </h3>

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-50 text-green-700 text-sm">
              Thank you! Your review has been submitted and is awaiting
              approval.
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Honeypot */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-4">
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
            />

            <input
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
            />

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStars(i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    size={22}
                    className={
                      i < stars
                        ? "fill-amber-500 text-amber-500"
                        : "text-gray-300 hover:text-amber-400"
                    }
                  />
                </button>
              ))}
            </div>

            <textarea
              placeholder="Your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 px-3 py-2 rounded resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
            />

            <button
              onClick={submit}
              disabled={loading}
              className="button-1 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
