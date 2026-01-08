// File: src/app/api/cart/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(): Promise<NextResponse> {
  const STRAPI = process.env.STRAPI_API_URL;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const res = await fetch(`${STRAPI}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const json = await res.json();
      return NextResponse.json(json, { status: res.status });
    }

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: unknown) {
    console.error("GET /api/cart error:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ✅ DELETE - Remove all items from user's cart after checkout
export async function DELETE(): Promise<NextResponse> {
  const STRAPI = process.env.STRAPI_API_URL;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 1️⃣ Fetch all items in the user's cart
    const res = await fetch(`${STRAPI}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to fetch cart items.");
    }

    const cartItems = await res.json();
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ success: true, message: "Cart already empty" });
    }

    // 2️⃣ Loop and delete each item
    for (const item of cartItems) {
      if (!item?.id) continue;
      await fetch(`${STRAPI}/api/cart/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    // 3️⃣ Return success
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE /api/cart error:", error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
