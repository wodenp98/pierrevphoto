import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";
import { prisma } from "@/utils/prisma/prisma";

const BodySchema = z.object({
  id: z.string(),
});

export async function DELETE(req: Request) {
  if (req.method === "DELETE") {
    const origin = req.headers.get("Origin");
    if (origin && origin !== `${process.env.BASE_URL}`) {
      return new Response("Mauvaise origine de la requête", { status: 403 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user.email) {
      return new Response("Bad Request", { status: 403 });
    }

    const bodyResult = BodySchema.safeParse(await req.json());

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
