import { FooterDetail } from "../types";

export async function getFooterDetail(): Promise<FooterDetail | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/footer-detail`, {
      next: { revalidate: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME) : 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch footer detail", await res.text());
      return null;
    }

    const data: FooterDetail = await res.json();
    return data;
  } catch (error) {
    console.error("Footer API Error:", error);
    return null;
  }
}
