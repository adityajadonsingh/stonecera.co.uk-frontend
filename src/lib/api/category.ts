import { cache } from "react";
import { Category } from "../types";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME)
  : 60;

/* ----------------------------------
   GET ALL CATEGORIES
----------------------------------- */
export const getAllCategories = cache(async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${process.env.API_URL!}/categories`, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      console.error("Error fetching categories:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
});

/* ----------------------------------
   GET CATEGORY BY SLUG
----------------------------------- */
export const getCategoryBySlug = cache(
  async (
    slug: string,
    params: Record<string, string | number | undefined> = {}
  ): Promise<Category> => {
    try {
      const cleanParams: Record<string, string> = {};

      for (const key in params) {
        const val = params[key];
        if (val !== undefined && val !== null) {
          cleanParams[key] = String(val);
        }
      }

      const query = new URLSearchParams(cleanParams).toString();
      const url = `${process.env.API_URL!}/category/${slug}${
        query ? `?${query}` : ""
      }`;

      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_TIME },
      });

      if (!res.ok) {
        console.error("Error fetching category data:", res.status, res.statusText);
        return {} as Category;
      }

      return res.json();
    } catch (error) {
      console.error("Failed to fetch category data:", error);
      return {} as Category;
    }
  }
);
export const getCategoryBySlugForMeta = cache(
  async (
    slug: string,
  ): Promise<Category> => {
    try {
      
      const url = `${process.env.API_URL!}/category/${slug}`;

      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_TIME },
      });

      if (!res.ok) {
        console.error("Error fetching category data:", res.status, res.statusText);
        return {} as Category;
      }

      return res.json();
    } catch (error) {
      console.error("Failed to fetch category data:", error);
      return {} as Category;
    }
  }
);
