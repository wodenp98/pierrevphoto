import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const ArticlesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    imageUrl: z.string(),
    description: z.string(),
    aspectRatio: z.string(),
    price: z.number(),
  })
);

export async function GET(req: Request) {
  if (req.method === "GET") {
    const origin = req.headers.get("origin");

    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }
    try {
      const articles = await prisma.article.findMany();

      const validateArticles = ArticlesSchema.safeParse(articles);

      if (!validateArticles.success) {
        throw new Error(validateArticles.error.message);
      }

      return NextResponse.json(validateArticles.data, {
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
