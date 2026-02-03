import { SitePolicy } from "../types";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME)
  : 60;

export async function getPolicy(pageName: string): Promise<SitePolicy | null> {
  const res = await fetch(
    `${process.env.API_URL}/site-policies/${pageName}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) return null;
  return res.json();
}
