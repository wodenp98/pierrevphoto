import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const CarouselImageSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    imageUrl: z.string(),
  })
);

export async function GET(req: Request) {
  if (req.method === "GET") {
    const origin = req.headers.get("origin");

    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }
    try {
      const carousel = await prisma.carousel.findMany({
        orderBy: {
          id: "desc",
        },
      });

      const validateCarousel = CarouselImageSchema.safeParse(carousel);

      if (!validateCarousel.success) {
        throw new Error(validateCarousel.error.message);
      }

      return NextResponse.json(validateCarousel.data, {
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
        Allow: "GET",
      },
    });
  }
}
