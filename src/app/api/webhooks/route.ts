import { stripe } from "../../../lib/stripe/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "../../../../prisma/client";
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

    // check si order marche correctement, le code est pas éxécuté car redirect

    const order = await prisma.order.create({
      data: {
        userId: session?.metadata?.userId!,
        totalPrice: (sessionItem?.amount_total as number) / 100,
        description: sessionItem?.line_items?.data.map((item: any) => ({
          description: item.price.product?.description,
        })),
        articles: {
          connect: sessionItem?.line_items?.data.map((item: any) => ({
            id: item.price.product.metadata.id,
          })),
        },
      },
      include: {
        articles: true,
      },
    });

    console.log(`Order ${order.id} créée pour l'utilisateur ${user.id}`);

    // Mettez à jour l'historique des commandes de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: session?.metadata?.userId },
      data: {
        orders: {
          connect: {
            id: order.id,
          },
        },
      },
    });

    console.log(
      `Historique des commandes de l'utilisateur ${updatedUser.id} mis à jour`
    );
  }

  return new NextResponse(null, { status: 200 });
}

/*session object: {
  id: 'cs_test_b19em1J4qMyUNYe8E3j6qPBM6UuW80C3VZmSsVsQDB2DuGdqGkIxW1d7u7',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 70500,
  amount_total: 77550,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/panier',
  client_reference_id: 'clnoqu2ol0000oqnwsn4wdt88',
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1697548452,
  currency: 'eur',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: 'cus_Opsskou9tYJyKs',
  customer_creation: 'if_required',
  customer_details: {
    address: {
      city: 'Le Kremlin-Bicêtre',
      country: 'FR',
      line1: '8 Rue Marc Sangnier',
      line2: null,
      postal_code: '94270',
      state: null
    },
    email: 'pipo27049298@gmail.com',
    name: 'Paul Vigneron',
    phone: '+33666666666',
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: 'pipo27049298@gmail.com',
  expires_at: 1697634852,
  invoice: 'in_1O2D6RCGBQIDG0SDGLhiOtMq',
  invoice_creation: {
    enabled: true,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      metadata: {},
      rendering_options: null
    }
  },
  line_items: {
    object: 'list',
    data: [ [Object], [Object] ],
    has_more: false,
    url: '/v1/checkout/sessions/cs_test_b19em1J4qMyUNYe8E3j6qPBM6UuW80C3VZmSsVsQDB2DuGdqGkIxW1d7u7/line_items'
  },
  livemode: false,
  locale: null,
  metadata: { userId: 'clnoqu2ol0000oqnwsn4wdt88' },
  mode: 'payment',
  payment_intent: 'pi_3O2D6PCGBQIDG0SD0i4Cj8WF',
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: {},
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: true },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: { allowed_countries: [ 'FR' ] },
  shipping_cost: null,
  shipping_details: {
    address: {
      city: 'Le Kremlin-Bicêtre',
      country: 'FR',
      line1: '8 Rue Marc Sangnier',
      line2: null,
      postal_code: '94270',
      state: ''
    },
    name: 'Paul Vigneron'
  },
  shipping_options: [],
  status: 'complete',
  submit_type: 'pay',
  subscription: null,
  success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 7050 },
  ui_mode: 'hosted',
  url: null
}

ITEMS
[
  {
    id: 'li_1O2D68CGBQIDG0SDfeYD4MiF',
    name: 'Hôtel Castel Marie-Louise',
    price: 385,
    imageUrl: 'https://i.imgur.com/FecdXBQ.jpg',
    details: '60*40 cm - Fine Art seul - Mat',
    createdAt: 1697548474608
  },
  {
    id: 'li_1O2D68CGBQIDG0SDgzPBx9ur',
    name: 'Pêcherie de Tharon-Plage',
    price: 390.5,
    imageUrl: 'https://i.imgur.com/hGSHu5X.jpg',
    details: '60*40 cm - Subligraphie - Mat',
    createdAt: 1697548474608
  }
] */
