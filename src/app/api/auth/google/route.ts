import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const STRAPI = process.env.STRAPI_API_URL;

  const { access_token } = await req.json();

  console.log("👉 Incoming access_token:", access_token);

  try {
    const res = await fetch(`${STRAPI}/api/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    const data = await res.json();

    console.log("👉 Strapi response:", data);

    if (!res.ok) {
      console.log("❌ Strapi failed");
      return NextResponse.json(data, { status: res.status });
    }

    const token = data.jwt;
    const maxAge = 60 * 60 * 24 * 7;
    const secure = process.env.NODE_ENV === "production";

    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${secure ? "Secure;" : ""}`;

    // 🔥 REDIRECT INSTEAD OF JSON
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": cookie,
        Location: "/account", // 🔥 redirect here
      },
    });
  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
