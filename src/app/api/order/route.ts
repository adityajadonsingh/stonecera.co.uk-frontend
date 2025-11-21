// app/api/order/route.ts
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("id");
const STRAPI = process.env.STRAPI_API_URL ?? "";
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!orderId) {
    return new Response(JSON.stringify({ error: "Missing order ID" }), { status: 400 });
  }

  try {
    const res = await fetch(`${STRAPI}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }); 

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch order" }), { status: 500 });
  }
}
