import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const STRAPI = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("🛂 SERVER TOKEN:", token);

  if (!token) {
    return NextResponse.json({ data: [] }, { status: 200 });
  }

  const res = await fetch(`${STRAPI}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
