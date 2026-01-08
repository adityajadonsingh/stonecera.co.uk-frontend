import { cookies } from "next/headers";

export async function getServerWishlist() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }

  const STRAPI_URL = process.env.STRAPI_API_URL;
  if (!STRAPI_URL) {
    console.error("STRAPI_API_URL is not set.");
    return null;
  }

  try{
    const res = await fetch(`${STRAPI_URL}/api/wishlist/products`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  }catch (error) {
    console.error("Failed to fetch wishlist products:", error);
    return null;
  }

}
