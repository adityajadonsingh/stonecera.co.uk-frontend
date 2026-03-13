import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const STRAPI = process.env.STRAPI_API_URL;

  try {
    const body = await req.json();

    const res = await fetch(`${STRAPI}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = data.jwt;
    const maxAge = 60 * 60 * 24 * 7;
    const secure = process.env.NODE_ENV === "production";

    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${
      secure ? "Secure;" : ""
    }`;

    return new Response(JSON.stringify({ user: data.user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
  } catch (err) {
    console.error("[auth/reset-password] ERROR:", err);

    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}