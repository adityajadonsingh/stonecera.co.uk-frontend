import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${STRAPI_URL}/api/cart/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Guest cart proxy error:", error);

    return NextResponse.json(
      { error: "Failed to fetch guest cart" },
      { status: 500 }
    );
  }
}