import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  aspectRatio: string;
  price: number;
  format: string;
  rendu: string;
  impression: string;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwaded-for") ?? "";
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new Response("Too Many Requests", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}}`,
      },
    });
  }

  const sessionUser = await getServerSession(authOptions);

  if (!sessionUser?.user || !sessionUser?.user.email) {
    return new Response(null, { status: 403 });
  }
  const userCart = await request.json();
  const origin = request.headers.get("origin");

  const taxRate = await stripe.taxRates.create({
    display_name: "TVA",
    description: "VAT France",
    country: "FR",
    jurisdiction: "FR",
    percentage: 10,
    inclusive: false,
    tax_type: "vat",
  });

  const lineItems = userCart?.cart.map((item: Item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description:
            item.format + " - " + item.impression + " - " + item.rendu,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
      tax_rates: [taxRate.id],
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    submit_type: "pay",
    customer_email: userCart?.email,
    shipping_address_collection: {
      allowed_countries: ["FR"],
    },
    metadata: {
      userId: userCart?.userId,
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/panier`,
    client_reference_id: userCart?.userId,
    phone_number_collection: {
      enabled: true,
    },
    invoice_creation: {
      enabled: true,
    },
  });

  return NextResponse.json(session);
}
