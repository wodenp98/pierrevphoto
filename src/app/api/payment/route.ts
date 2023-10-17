import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
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

  const lineItems = userCart?.cart.map((item: any) => {
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
    // automatic_tax: {
    //   enabled: true,
    // },
  });

  return NextResponse.json(session);
}
