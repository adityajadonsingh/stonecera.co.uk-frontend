import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ categories: [], products: [] });
  }

  const res = await fetch(
    `${process.env.API_URL}/search?q=${encodeURIComponent(q)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { categories: [], products: [] },
      { status: 500 }
    );
  }

  return NextResponse.json(await res.json());
}
