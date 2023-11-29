import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const ArticleSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  imagePreview: z.string(),
  description: z.string(),
  aspectRatio: z.string(),
  price: z.number(),
});

type ArticleSchema = z.infer<typeof ArticleSchema>;

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  if (request.method === "GET") {
    const origin = request.headers.get("origin");

    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", {
        status: 403,
      });
    }
    try {
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
