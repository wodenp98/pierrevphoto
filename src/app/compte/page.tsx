/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { prisma } from "../../utils/prisma/prisma";
import UserInfo from "@/components/CompteComponents/UserInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import OrderComponent from "@/components/CompteComponents/OrderComponent";
import { Separator } from "@/components/ui/separator";
import { OrdersProps } from "@/types/OrderTypes";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Pierre.V | Mon compte",
  description:
    "Consultez votre profil utilisateur sur le site Pierre.V. Accédez à vos informations personnelles et vos commandes passées. Gérez votre compte. Bienvenue dans votre espace personnel !",
};

const OrdersSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    articleId: z.number(),
    orderedAt: z.string(),
    totalPrice: z.number(),
    description: z.string(),
    status: z.string(),
    articles: z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      imageUrl: z.string(),
      description: z.string(),
    }),
  })
);

type Order = z.infer<typeof OrdersSchema>;

async function getOrders(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/historique-commande`, {
    body: JSON.stringify(userId),
    method: "POST",
    headers: new Headers(headers()),
    credentials: "same-origin",
  });

  if (!res.ok) {
    return null;
  }

  const data = OrdersSchema.safeParse(await res.json());

  if (!data.success) {
    return null;
  }

  return data.data;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const orders = await getOrders(session?.user.id as string);

  return (
    <main className="flex 1 mt-20">
      <div className="container relative">
        <section className="flex flex-col items-center justify-center mt-8 mb-12">
          <div className="flex items-center justify-center w-full">
            <div className="relative">
              <Image
                src={session?.user.image ?? "/assets/photo-utilisateur.jpg"}
                alt="Photo de profil"
                width={80}
                height={80}
                className="rounded-full object-cover "
              />
              <SignOutButton />
            </div>
          </div>

          <>
            <div className="text-center my-4">
              Bonjour {session?.user?.name ?? ""} !
            </div>
            <Tabs defaultValue="informations" className="w-11/12 lg:w-8/12">
              <TabsList className="grid w-full h-10 grid-cols-2">
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="commandes">Commandes</TabsTrigger>
              </TabsList>
              <TabsContent value="informations">
                <UserInfo />
              </TabsContent>
              <TabsContent value="commandes">
                <Card>
                  <CardHeader>
                    <CardTitle className="mb-4">Commandes</CardTitle>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {orders?.length === 0 ? (
                      <div className="flex flex-col items-center text-center">
                        <p>
                          Vous n'avez pas encore effectué d'achat sur notre
                          site!
                        </p>
                        <span>Mais vous pouvez changer ça 😉</span>
                      </div>
                    ) : (
                      orders?.map((command) => (
                        <div key={command.id}>
                          <OrderComponent historyCommand={command} />
                          <Separator />
                        </div>
                      ))
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-center">
                    <Link href="/boutique">
                      <Button>BOUTIQUE</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        </section>
      </div>
    </main>
  );
}
