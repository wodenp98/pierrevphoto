import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const PortfolioSchema = z.array(
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
      const portfolio = await prisma.portfolio.findMany();

      const validatePortfolio = PortfolioSchema.safeParse(portfolio);

      if (!validatePortfolio.success) {
        throw new Error(validatePortfolio.error.message);
      }

      return NextResponse.json(validatePortfolio.data, {
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
