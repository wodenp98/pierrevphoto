/* eslint-disable react/no-unescaped-entities */
"use client";
import { loadStripe } from "@stripe/stripe-js";
import { BsCartX, BsCreditCard } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { useSession } from "next-auth/react";
import NoDataCart from "@/components/NoDataComponents/NoDataCart";
import prisma from "../../../prisma/client";
import { use, useEffect, useState } from "react";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

type CartItem = {
  id: string;
  nom: string;
  price: number;
  imageUrl: string;
  format: string;
  rendu: string;
  impression: string;
};

export default function Panier() {
  const { data: session } = useSession();
  const { cart, totalPrice } = useCartStore();
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const resetCart = useCartStore((state) => state.reset);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <main>
        <ul className="flex ml-6">
          <li className="text-gray-300">Accueil</li>
          <li className="text-gray-300 mx-2">-</li>
          <li>Panier</li>
        </ul>
        <h1 className="ml-6 mt-6 text-4xl">Panier</h1>
        <section className="flex flex-col items-center mt-4">
          <Card className="w-11/12 lg:w-9/12">
            <CardHeader>
              <CardTitle>Vos articles</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-36" />
              <Skeleton className="w-full h-36" />
              <Skeleton className="w-full h-36" />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4 bg-gray-500" />
              <div className="w-full flex justify-between">
                <span className="uppercase font-bold text-lg">Total</span>
                <span className="text-lg">0 €</span>
              </div>
              <Button className=" mt-8 w-1/2">
                <div className="flex items-center justify-center ">
                  <p>Paiement</p>
                  <BsCreditCard className="ml-4 w-5 h-5 text-center" />
                </div>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return <NoDataCart />;
  }

  const handleCheckout = async () => {
    if (!session?.user) {
      return toast({
        variant: "destructive",
        className: "bg-red-500 text-white",
        title: "Vous devez avoir un compte pour passer commande.",
        action: (
          <Link href={"/compte"}>
            <ToastAction altText="Go to account">Compte</ToastAction>
          </Link>
        ),
      });
    }

    const stripe = await stripePromise;
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        userId: session?.user?.id,
        email: session?.user?.email,
      }),
    });

    const responseData = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: responseData.id,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        className: "bg-red-500 text-white",
        title: "Une erreur est survenue lors du paiement.",
      });
    }
    resetCart();
  };

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Panier</li>
      </ul>
      <h1 className="ml-6 mt-6 text-4xl">Panier</h1>
      <section className="flex flex-col items-center mt-4">
        <Card className="w-11/12 lg:w-9/12">
          <CardHeader>
            <CardTitle>Vos articles</CardTitle>
          </CardHeader>
          <CardContent>
            {cart?.map((item: any) => (
              <div key={item.id} className="flex mt-5">
                <div className="flex-shrink-0">
                  <Image
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.name}
                    width={360}
                    height={360}
                    className="object-cover w-28 h-28 sm:w-36 sm:h-36"
                  />
                </div>
                <div className="flex-grow ml-4">
                  <p className="text-sm lg:text-xl font-bold">{item.nom}</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm ">
                        Détails
                      </AccordionTrigger>
                      <AccordionContent className="text-xs">
                        {item.format}
                      </AccordionContent>
                      <AccordionContent className="text-xs">
                        {item.impression}
                      </AccordionContent>
                      <AccordionContent className="text-xs">
                        {item.rendu}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex flex-col items-end justify-between ml-4">
                  <span className="text-sm lg:text-xl px-4">
                    {item.price} €
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item)}
                    className=" text-xs  hover:bg-red-600 hover:text-white"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="my-4 bg-gray-500" />
            <div className="w-full flex justify-between">
              <span className="uppercase font-bold text-lg">Total</span>
              <span className="text-lg">{totalPrice} €</span>
            </div>
            <Button className=" mt-8 w-1/2" onClick={handleCheckout}>
              <div className="flex items-center justify-center ">
                <p>Paiement</p>
                <BsCreditCard className="ml-4 w-5 h-5 text-center" />
              </div>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
