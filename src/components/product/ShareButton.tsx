// components/product/ShareButton.tsx
"use client";

import { Mail, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  title: string;
}


/* =========================================================
   BRAND ICONS
========================================================= */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.5l.4-3h-2.9V9.1c0-.9.3-1.6 1.6-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.4v7h3.1Z" />
    </svg>
  );
}


function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.2L3 2h6.2l4.3 5.7L18.9 2Zm-1.1 17.7h1.7L8.3 4.2H6.5l11.3 15.5Z" />
    </svg>
  );
}


function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l5-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.1c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a7.7 7.7 0 1 1 7 3.8Zm4.2-5.7c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.2-.2.2-.4.1-.2-.1-.8-.3-1.5-1-.5-.5-.8-1-.9-1.2-.1-.2 0-.3.1-.4l.3-.3c.1-.1.2-.2.2-.3.1-.1 0-.3 0-.4l-.6-1.5c-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.5.3-.2.2-.7.7-.7 1.7s.7 2  .8 2.1c.1.1 1.4 2.2 3.5 3 .5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}


function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c-.1-1.5 0-3.2.4-4.7l1-4.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.3 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.5 2.1-4.5 4.3 0 .9.3 1.8.8 2.4.1.1.1.2.1.4l-.3 1.1c-.1.4-.3.5-.6.3-1.1-.5-1.7-2.1-1.7-3.4 0-2.8 2-6 6.4-6 3.4 0 6.1 2.4 6.1 5.5 0 3.3-2.1 6-5 6-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.9-.8 2-1.2 2.7.9.3 1.9.5 2.9.5a9.5 9.5 0 1 0 0-19Z" />
    </svg>
  );
}


/* =========================================================
   SHARE BUTTON
========================================================= */

export default function ShareButton({ title }: Props) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [url, setUrl] = useState<string | null>(null);


  /* =========================================================
     CLIENT ONLY SETUP
  ========================================================= */

  useEffect(() => {
    setUrl(window.location.href);

    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanNativeShare(true);
    }
  }, []);


  /* =========================================================
     NATIVE SHARE
  ========================================================= */

  const nativeShare = async () => {
    if (!url) return;

    try {
      await navigator.share({
        title,
        url,
      });
    } catch {
      // User cancelled the share dialog.
    }
  };


  /* =========================================================
     PREVENT HYDRATION MISMATCH
  ========================================================= */

  if (!url) return null;


  /* =========================================================
     SOCIAL LINKS
  ========================================================= */

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,

    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${title} ${url}`
    )}`,

    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}`,

    mail: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url)}`,
  };


  /* =========================================================
     SHARED ICON STYLES
  ========================================================= */

  const iconClass = `
    flex
    h-8
    w-8
    items-center
    justify-center
    rounded-full
    text-[#4c4331]
    transition-all
    duration-200
    hover:bg-[#f5f0e8]
    hover:text-[#99a14e]
    hover:scale-105
  `;


  return (
    <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">

      {/* =====================================================
          LABEL
      ===================================================== */}

      <span
        className="
          mr-1
          text-[11px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-[#8d8d84]
        "
      >
        Share
      </span>


      {/* =====================================================
          NATIVE SHARE
      ===================================================== */}

      {canNativeShare ? (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share this product"
          title="Share"
          className={iconClass}
        >
          <Share2
            size={19}
            strokeWidth={1.6}
          />
        </button>
      ) : (

        /* ===================================================
           SOCIAL SHARE LINKS
        =================================================== */

        <div className="flex items-center gap-1">

          {/* Facebook */}

          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Share on Facebook"
            className={iconClass}
          >
            <FacebookIcon />
          </a>


          {/* X */}

          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            title="Share on X"
            className={iconClass}
          >
            <XIcon />
          </a>


          {/* WhatsApp */}

          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
            className={iconClass}
          >
            <WhatsAppIcon />
          </a>


          {/* Pinterest */}

          <a
            href={links.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Pinterest"
            title="Share on Pinterest"
            className={iconClass}
          >
            <PinterestIcon />
          </a>


          {/* Email */}

          <a
            href={links.mail}
            aria-label="Share via Email"
            title="Share via Email"
            className={iconClass}
          >
            <Mail
              size={19}
              strokeWidth={1.6}
            />
          </a>

        </div>
      )}
    </div>
  );
}