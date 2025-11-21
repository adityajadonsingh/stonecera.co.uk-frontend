import { AppUser } from "../types";
import { cookies } from "next/headers";

export async function getUserDetails(): Promise<AppUser | null> {
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

  try {
    const res = await fetch(`${STRAPI_URL}/api/user-details/redis`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }
}