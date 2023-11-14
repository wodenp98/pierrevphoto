
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { prisma } from "@/utils/prisma/prisma";


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 s"),
});

const BodySchema = z.object({
  // Define your properties here
  id: z.string(),
});

type BodyValidation = z.infer<typeof BodySchema>;

export async function DELETE(req: Request) {
  if (req.method === "DELETE") {
    const origin = req.headers.get("Origin");
    if (origin && origin !== "http://localhost:3000") {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }
    const ip = req.headers.get("x-forwaded-for") ?? "";
    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      const now = Date.now();
      const retryAfter = Math.floor((reset - now) / 1000);
      return new Response("Too Many Requests", {
        status: 429,
        headers: {
          ["retry-after"]: `${retryAfter}}`,
        },
      });
    }
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user.email) {
      return new Response("Bad Request", { status: 403 });
    }

    const body = await req.json();

    const bodyResult = BodySchema.safeParse(body);

    if (!bodyResult.success) {
      return new Response("Bad Request", { status: 403 });
    }

    if (session.user.id !== bodyResult.data.id) {
      return new Response("Bad Request", { status: 403 });
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: bodyResult.data.id,
      },
    });

    if (!deleteUser) {
      return new Response("Bad Request", { status: 403 });
    }

    return new Response(null, { status: 200 });
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
