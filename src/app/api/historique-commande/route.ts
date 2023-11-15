import { prisma } from "@/utils/prisma/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

const OrdersSchema = z.object({
  id: z.string(),
  userId: z.string(),
  articleId: z.number(),
  orderedAt: z.date(),
  totalPrice: z.number(),
  description: z.string(),
  status: z.string(),
  articles: z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    description: z.string(),
  }),
});

type OrdersSchema = z.infer<typeof OrdersSchema>;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const id = await req.json();
  console.log("test", id);

  const ordersArticles = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      articles: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
        },
      },
    },
    orderBy: {
      orderedAt: "desc",
    },
  });

  const validateOrders = OrdersSchema.array().safeParse(ordersArticles);

  if (!validateOrders.success) {
    throw new Error(validateOrders.error.message);
  }

  return NextResponse.json(validateOrders.data, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
