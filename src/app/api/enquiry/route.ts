import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { captchaToken } = body;

    if (!captchaToken) {
      return Response.json({ message: "Captcha missing" }, { status: 400 });
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: captchaToken,
          remoteip: req.headers.get("x-forwarded-for") || "",
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      console.log(verifyData["error-codes"]);
      return Response.json({ message: "Captcha failed" }, { status: 400 });
    }

    const res = await fetch(`${process.env.STRAPI_API_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
