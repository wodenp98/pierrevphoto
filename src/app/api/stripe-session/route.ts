import { stripe } from "@/utils/stripe/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function POST(req: Request) {
  if (req.method === "POST") {
    const origin = req.headers.get("origin");

    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }

    const cart: Item[] = await req.json();

    try {
      const sessionUser = await getServerSession(authOptions);

      if (!sessionUser?.user || !sessionUser?.user.email) {
        return new Response(null, { status: 403 });
      }

      const taxRate = await stripe.taxRates.create({
        display_name: "TVA",
        description: "VAT France",
        country: "FR",
        jurisdiction: "FR",
        percentage: 10,
        inclusive: false,
        tax_type: "vat",
      });

      const lineItems = cart.map((item: Item) => {
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
        customer_email: sessionUser.user.email,
        shipping_address_collection: {
          allowed_countries: ["FR"],
        },
        metadata: {
          userId: sessionUser?.user.id,
        },
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/`,
        client_reference_id: sessionUser?.user.id,
        phone_number_collection: {
          enabled: true,
        },
        invoice_creation: {
          enabled: true,
        },
      });

      if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({
            error: { statusCode: 500, message: "Session is not defined" },
          }),
          { status: 500 }
        );
      }
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
