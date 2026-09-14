import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isDev = process.env.DEVELOPMENT === "dev";

  // Dev / staging environment
  if (isDev) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // Production
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/account/",
        "/auth/",
        "/login",
        "/register",
        "/reset-password",
        "/cart",
        "/checkout",
        "/wishlist",
        "/order/",
        "/api/stripe-paid",
        "/*?*",
      ],
    },
    sitemap: "https://stonecera.co.uk/sitemap.xml",
  };
}