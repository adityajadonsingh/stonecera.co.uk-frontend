import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate important fields
    if (!body || !body.totals?.total) {
      return NextResponse.json({ error: "Missing totals" }, { status: 400 });
    }
    if (!body.orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // Convert amount to smallest currency unit (pence)
    const finalAmount = Math.round(Number(body.totals.total) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body?.contact?.email ?? undefined,

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Stonecera Order Payment",
              description: `Order #${body.orderId}`,
            },
            unit_amount: finalAmount,
          },
          quantity: 1,
        },
      ],

      // CORRECT REDIRECT URL
      // User returns to: /order/success/[orderId]
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success/${body.orderId}`,

      // User goes back to checkout on cancel
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,

      // Stripe metadata (read inside webhook)
      metadata: {
        orderId: String(body.orderId),
        email: body?.contact?.email || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("STRIPE SESSION ERROR:", err);

    const message =
      err instanceof Error ? err.message : "Stripe session creation failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
