import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const STRAPI = process.env.STRAPI_API_URL;

    const { access_token } = await req.json();

    console.log("FRONTEND ACCESS TOKEN:", access_token);

    const res = await fetch(`${STRAPI}/api/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    const data = await res.json();

    console.log("STRAPI RESPONSE STATUS:", res.status);
    console.log("STRAPI RESPONSE DATA:", data);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", data.jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("GOOGLE ROUTE ERROR:", err);

    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}