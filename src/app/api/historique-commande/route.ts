import { prisma } from "@/utils/prisma/prisma";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";

const OrdersSchema = z.array(
  z.object({
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
  })
);

type OrdersSchema = z.infer<typeof OrdersSchema>;

export async function POST(req: Request) {
  if (req.method === "POST") {
    const origin = req.headers.get("origin");

    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }

    const id: string = await req.json();

    try {
      const session = await getServerSession(authOptions);
      if (!session?.user || !session?.user.email) {
        return new Response(null, { status: 403 });
      }

      if (id !== session?.user.id) {
        return new Response(null, { status: 403 });
      }

      const ordersArticles = await prisma.order.findMany({
        where: {
          userId: id,
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

      const validateOrders = OrdersSchema.safeParse(ordersArticles);

      if (!validateOrders.success) {
        throw new Error(validateOrders.error.message);
      }

      return NextResponse.json(validateOrders.data, {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }
  } else {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }
}
