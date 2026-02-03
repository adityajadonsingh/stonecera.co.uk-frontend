import type { Metadata } from "next";
import { StrapiSEO } from "./types";



type BuildSEOParams = {
  seo: StrapiSEO | null;
  url?: string;
  siteName?: string;
};

export function buildMetadata({
  seo,
  url,
  siteName = "Stonecera",
}: BuildSEOParams): Metadata {
  if (!seo) {
    return {
      title: siteName,
      description: "",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const robotsValue = seo.robots?.toLowerCase() || "";

  return {
    title: seo.meta_title,
    description: seo.meta_description,

    robots: robotsValue.includes("index")
      ? { index: true, follow: true }
      : { index: false, follow: false },

    alternates: seo.canonical_tag
      ? {
          canonical: seo.canonical_tag,
        }
      : undefined,

    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      url: url || siteUrl,
      siteName,
      type: "website",
      images: seo.og_image
        ? [
            {
              url: seo.og_image.startsWith("http")
                ? seo.og_image
                : `${siteUrl}${seo.og_image}`,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },

    twitter: {
      card: seo.twitter_image ? "summary_large_image" : "summary",
      title: seo.twitter_title || seo.meta_title,
      description: seo.twitter_description || seo.meta_description,
      images: seo.twitter_image
        ? [
            seo.twitter_image.startsWith("http")
              ? seo.twitter_image
              : `${siteUrl}${seo.twitter_image}`,
          ]
        : [],
    },
  };
}
