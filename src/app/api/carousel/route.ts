import { prisma } from "@/utils/prisma/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const CarouselImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
});

export type CarouselImageSchema = z.infer<typeof CarouselImageSchema>;

export async function GET(request: Request) {
  console.log("ok", request);
  const carousel = await prisma.carousel.findMany();

  const validateCarousel = CarouselImageSchema.array().safeParse(carousel);

  if (!validateCarousel.success) {
    throw new Error(validateCarousel.error.message);
  }

  return new Response(JSON.stringify(validateCarousel.data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
