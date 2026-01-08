// src/lib/api/homepage.ts

import { HomepageData } from "../types";

export async function getHomepage(): Promise<HomepageData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homepage`, {
      next: { revalidate: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME) : 60 },
    });

    const json = await res.json();

    // custom formatted response from your backend
    return json as HomepageData;
  } catch (e) {
    console.error("Homepage fetch failed:", e);
    return null;
  }
}
