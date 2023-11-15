import { prisma } from "@/utils/prisma/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

const PortfolioImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
});

type PortfolioImageSchema = z.infer<typeof PortfolioImageSchema>;

// rendre le swiper plus rapide

export async function GET() {
  const portfolio = await prisma.portfolio.findMany();

  const validatePortfolio = PortfolioImageSchema.array().safeParse(portfolio);

  if (!validatePortfolio.success) {
    throw new Error(validatePortfolio.error.message);
  }

  return NextResponse.json(validatePortfolio.data, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
