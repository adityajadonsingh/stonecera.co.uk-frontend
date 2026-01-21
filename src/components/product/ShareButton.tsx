"use client";

import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
}

export default function ShareButton({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    // Native share (mobile + supported desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        return;
      }
    }

    // 🔁 Fallback: copy link
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={share}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition cursor-pointer"
      aria-label="Share product"
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-600" />
          <span className="text-green-600">Link copied</span>
        </>
      ) : (
        <>
          <Share2 size={16} />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
