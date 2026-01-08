import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const STRAPI = process.env.STRAPI_API_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url =
    ids && ids.length > 0
      ? `${STRAPI}/api/wishlist/products?ids=${ids}`
      : `${STRAPI}/api/wishlist/products`;

  const res = await fetch(url, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
