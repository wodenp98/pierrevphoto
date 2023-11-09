import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { z } from "zod";

export const OrdersSchema = z.object({
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

export type OrdersSchema = z.infer<typeof OrdersSchema>;

export const itemsPurchased = async () => {
  const session = await getServerSession(authOptions);

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

  return validateOrders.data;
};
