import { prisma } from "@/utils/prisma/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

const ArticleSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  aspectRatio: z.string(),
  price: z.number(),
});

type ArticleSchema = z.infer<typeof ArticleSchema>;

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const articleById = await prisma.article.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  const validateArticles = ArticleSchema.safeParse(articleById);

  if (!validateArticles.success) {
    throw new Error(validateArticles.error.message);
  }

  return NextResponse.json(validateArticles.data, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
