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
import { redirect } from "next/navigation";

// faire un layout récupérant la session? meilleure opti?

export default async function Page() {
  const session = await getServerSession(authOptions);

  const ordersWithArticles = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      articles: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
        },
      },
    },
    orderBy: {
      orderedAt: "desc",
    },
  });

  return (
    <main className="flex 1">
      <div className="container relative">
        <section className="flex flex-col items-center justify-center mt-4 mb-12">
          <div className="flex items-end justify-end">
            <div className="relative">
              <Image
                src={session?.user.image ?? "/photo-utilisateur.jpg"}
                alt="Photo de profil"
                width={80}
                height={80}
                className="rounded-full object-cover"
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
                    <CardTitle className="uppercase mb-4">Commandes</CardTitle>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {ordersWithArticles.length === 0 ? (
                      <div className="flex flex-col items-center text-center">
                        <p>
                          Vous n'avez pas encore effectué d'achat sur notre
                          site!
                        </p>
                        <span>Mais vous pouvez changer ça 😉</span>
                      </div>
                    ) : (
                      ordersWithArticles?.map((command: OrdersProps) => (
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
