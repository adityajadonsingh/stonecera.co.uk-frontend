import type { Catalogue } from "@/lib/types";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME)
  : 60;

export async function getCatalogues(): Promise<Catalogue[]> {
  const res = await fetch(
    `${process.env.API_URL!}/product-catalogues`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) return [];
  return res.json();
}
