"use client";

import {
  Share2,
  Facebook,
  Twitter,
  Mail,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  title: string;
}

export default function ShareButton({ title }: Props) {
  const [canNativeShare, setCanNativeShare] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  /* ---------- CHECK NATIVE SHARE ---------- */
  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanNativeShare(true);
    }
  }, []);

  /* ---------- NATIVE SHARE ---------- */
  const nativeShare = async () => {
    try {
      await navigator.share({
        title,
        url,
      });
    } catch {
      // user cancelled
    }
  };

  /* ---------- FALLBACK URLS ---------- */
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url,
    )}`,
    mail: `mailto:?subject=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(url)}`,
  };

  /* ---------- UI ---------- */
  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="text-xs uppercase tracking-wide text-gray-400">
        Share
      </span>

      {canNativeShare ? (
        <button
          onClick={nativeShare}
          className="text-gray-600 hover:text-black transition cursor-pointer"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>
      ) : (
        <div className="flex items-center gap-3 text-gray-600">
          <a
            href={links.facebook}
            target="_blank"
            aria-label="Share on Facebook"
            className="hover:text-black transition"
          >
            <Facebook size={18} />
          </a>

          <a
            href={links.twitter}
            target="_blank"
            aria-label="Share on X"
            className="hover:text-black transition"
          >
            <Twitter size={18} />
          </a>

          <a
            href={links.whatsapp}
            target="_blank"
            aria-label="Share on WhatsApp"
            className="hover:text-black transition"
          >
            <svg viewBox="0 0 32 32" className="w-[18px] h-[18px] fill-current">
              <path d="M19.11 17.2c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.47.13-.62.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.48.7.3 1.25.48 1.68.62.7.22 1.34.2 1.85.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
              <path d="M16.02 2.67c-7.4 0-13.42 6.02-13.42 13.42 0 2.37.62 4.68 1.8 6.72L2.6 29.33l6.73-1.77a13.38 13.38 0 006.7 1.82h.01c7.4 0 13.42-6.02 13.42-13.42 0-3.58-1.4-6.94-3.94-9.48a13.35 13.35 0 00-9.5-3.94zm0 24.4c-2.04 0-4.04-.55-5.78-1.6l-.41-.24-4 1.05 1.07-3.9-.27-.4a11.14 11.14 0 01-1.74-6.02c0-6.16 5.01-11.17 11.18-11.17 2.99 0 5.8 1.17 7.91 3.28a11.1 11.1 0 013.27 7.9c0 6.16-5.01 11.17-11.17 11.17z" />
            </svg>
          </a>

          <a
            href={links.pinterest}
            target="_blank"
            aria-label="Share on Pinterest"
            className="hover:text-black transition"
          >
            <svg
              viewBox="0 0 384 512"
              className="w-[18px] h-[18px] fill-current"
            >
              <path d="M204 6C103 6 0 109 0 210c0 78 50 121 81 121 13 0 21-37 21-47 0-12-30-37-30-86 0-105 80-179 181-179 88 0 154 46 154 138 0 66-26 191-112 191-31 0-57-23-57-54 0-46 32-91 32-141 0-82-117-67-117 32 0 20 2 42 11 60l-46 194c-14 60-2 134-1 141 0 4 6 6 8 2 3-4 39-48 52-104 4-15 23-88 23-88 11 21 44 40 79 40 104 0 175-95 175-223C384 93 304 6 204 6z" />
            </svg>
          </a>

          <a
            href={links.mail}
            aria-label="Share via Email"
            className="hover:text-black transition"
          >
            <Mail size={18} />
          </a>
        </div>
      )}
    </div>
  );
}
