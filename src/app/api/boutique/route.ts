// import { prisma } from "@/utils/prisma/prisma";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import { NextResponse } from "next/server";
// import { z } from "zod";

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(5, "10 s"),
// });

// const ArticlesSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   imageUrl: z.string(),
//   description: z.string(),
//   aspectRatio: z.string(),
//   price: z.number(),
// });

// type ArticlesSchema = z.infer<typeof ArticlesSchema>;

// export async function GET() {
//   const articles = await prisma.article.findMany();
//   console.log("first", articles);

//   const validateArticles = ArticlesSchema.array().safeParse(articles);

//   console.log("second", validateArticles);

//   if (!validateArticles.success) {
//     throw new Error(validateArticles.error.message);
//   }

//   return NextResponse.json(validateArticles.data, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     status: 200,
//   });
// }

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
    try {
      // const origin = req.headers.get("Origin");
      // const ip = req.headers.get("x-forwaded-for") ?? "";
      // console.log("request", origin);
      // console.log("ip", ip);
      const articles = await prisma.article.findMany();

      const validateArticles = ArticlesSchema.safeParse(articles);

      if (!validateArticles.success) {
        throw new Error(validateArticles.error.message);
      }

      return NextResponse.json(articles, {
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
