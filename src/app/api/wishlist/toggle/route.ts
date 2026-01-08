import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const STRAPI = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const body = await req.json();

  console.log("🔥 TOGGLE via proxy:", body, token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${STRAPI}/wishlist/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
