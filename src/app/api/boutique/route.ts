import { prisma } from "@/utils/prisma/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

const ArticlesSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  aspectRatio: z.string(),
  price: z.number(),
});

type ArticlesSchema = z.infer<typeof ArticlesSchema>;

export async function GET() {
  const articles = await prisma.article.findMany();

  const validateArticles = ArticlesSchema.array().safeParse(articles);

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
