import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface StripeCartItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const body = (await req.json()) as {
      items: StripeCartItem[];
      success_url: string;
      cancel_url: string;
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${body.success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.cancel_url,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("STRIPE ERROR:", error);
    return NextResponse.json(
      { error: "Stripe create session failed" },
      { status: 500 }
    );
  }
}
