import { BlogPage } from "../types";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME)
  : 60;


export async function getBlogs(params?: {
  page?: number;
  limit?: number;
}): Promise<BlogPage> {
  const qs = new URLSearchParams();

  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const res = await fetch(
    `${process.env.API_URL!}/blogs?${qs.toString()}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) {
    return {
      data: [],
      meta: { page: 1, pageSize: 12, total: 0, pageCount: 0 },
    };
  }

  return res.json();
}
export async function getBlogBySlug(slug: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) return null;
  return res.json();
}