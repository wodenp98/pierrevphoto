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
    sessionItem?.line_items?.data.map(async (item: any) => {
      await prisma.order.create({
        data: {
          userId: sessionItem?.metadata?.userId as string,
          articleId: Number(item.price.product.metadata.id),
          totalPrice: item.amount_total,
          description: item.price.product.description,
        },
      });
    });
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}

/*
session {
  id: 'cs_test_b1p83YWJaqAFJfnTcctv3CI7J4N2waZsQbXvx3am0uMh0LmAxB9n0MwD9m',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 66500,
  amount_total: 73150,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/panier',
  client_reference_id: 'clnuirlrn0000oq941iih18d9',
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1697577227,
  currency: 'eur',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: 'cus_Oq0bsp5qlB3U5o',
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
    email: 'paulvigneron4698@gmail.com',
    name: 'Paul Vigneron',
    phone: '+33666666666',
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: 'paulvigneron4698@gmail.com',
  expires_at: 1697663627,
  invoice: 'in_1O2KagCGBQIDG0SDxG9X1BGr',
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
    url: '/v1/checkout/sessions/cs_test_b1p83YWJaqAFJfnTcctv3CI7J4N2waZsQbXvx3am0uMh0LmAxB9n0MwD9m/line_items'
  },
  livemode: false,
  locale: null,
  metadata: { userId: 'clnuirlrn0000oq941iih18d9' },
  mode: 'payment',
  payment_intent: 'pi_3O2KaeCGBQIDG0SD0l5Y5ERk',
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
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 6650 },
  ui_mode: 'hosted',
  url: null
}

items
{
  id: 'li_1O2KaFCGBQIDG0SDNd1DaQOD',
  object: 'item',
  amount_discount: 0,
  amount_subtotal: 36000,
  amount_tax: 3600,
  amount_total: 39600,
  currency: 'eur',
  description: 'Pêcheur',
  price: {
    id: 'price_1O2KaFCGBQIDG0SD17o4kKQK',
    object: 'price',
    active: false,
    billing_scheme: 'per_unit',
    created: 1697577227,
    currency: 'eur',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_OpumD3fybVhb7w',
      object: 'product',
      active: false,
      attributes: [],
      created: 1697555584,
      default_price: null,
      description: '60*40 cm - Fine Art seul - Satiné',
      features: [],
      images: [Array],
      livemode: false,
      metadata: [Object],
      name: 'Pêcheur',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      type: 'service',
      unit_label: null,
      updated: 1697555584,
      url: null
    },
    recurring: null,
    tax_behavior: 'unspecified',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 36000,
    unit_amount_decimal: '36000'
  },
  quantity: 1
}
{
  id: 'li_1O2KaFCGBQIDG0SDPDkN9Uie',
  object: 'item',
  amount_discount: 0,
  amount_subtotal: 30500,
  amount_tax: 3050,
  amount_total: 33550,
  currency: 'eur',
  description: 'Phare de Villes Martin',
  price: {
    id: 'price_1O2KaFCGBQIDG0SDx8hi5Xum',
    object: 'price',
    active: false,
    billing_scheme: 'per_unit',
    created: 1697577227,
    currency: 'eur',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_OpvxHkm3hZ8CMg',
      object: 'product',
      active: false,
      attributes: [],
      created: 1697559959,
      default_price: null,
      description: '30*45 cm - Subligraphie - Mat',
      features: [],
      images: [Array],
      livemode: false,
      metadata: [Object],
      name: 'Phare de Villes Martin',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      type: 'service',
      unit_label: null,
      updated: 1697559959,
      url: null
    },
    recurring: null,
    tax_behavior: 'unspecified',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 30500,
    unit_amount_decimal: '30500'
  },
  quantity: 1
} */
