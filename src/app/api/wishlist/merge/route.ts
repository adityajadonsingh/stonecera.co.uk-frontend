import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const STRAPI = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({});

  const body = await req.json();

  await fetch(`${STRAPI}/wishlist/merge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ ok: true });
}
