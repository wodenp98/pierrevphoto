import { stripe } from "../../../utils/stripe/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "../../../utils/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const sessionItem = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product", "line_items"],
    });

    const user = await prisma.user.findUnique({
      where: { id: session?.metadata?.userId },
    });

    if (!user) {
      throw new Error(`User not found`);
    }
    sessionItem?.line_items?.data.map(async (item: any) => {
      await prisma.order.create({
        data: {
          userId: sessionItem?.metadata?.userId as string,
          articleId: Number(item.price?.product.metadata.id) as number,
          totalPrice: item.amount_total as number,
          description: item.price?.product.description as string,
        },
      });
    });
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}
