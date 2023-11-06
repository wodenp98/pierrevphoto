"use client";
import useFromStore from "@/lib/store/hooks/useFromStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { ToastAction } from "../../ui/toast";
import { toast } from "../../ui/use-toast";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";
import Image from "next/image";
import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/stripe-client";

type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  format: string;
  rendu: string;
  impression: string;
  aspectRatio: string;
  description: string;
};

export default function CartIconNavbar() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!session?.user) {
      return toast({
        variant: "destructive",
        className: "bg-red-500 text-white",
        title: "Vous devez avoir un compte pour passer commande.",
        action: (
          <Link href={"/compte"}>
            <ToastAction altText="Compte">Compte</ToastAction>
          </Link>
        ),
      });
    }

    try {
      const { sessionId } = await postData({
        url: "/api/stripe-session",
        data: cart,
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="relative cursor-pointer">
          <ShoppingCart size={24} strokeWidth={1.5} className="mr-4" />
          <span className="absolute top-1 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {cart ? cart.length : 0}
          </span>
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Panier</SheetTitle>
          <Separator />
        </SheetHeader>
        {!cart || cart.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCart size={64} className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <>
            <div>
              {cart?.map((item: CartItem) => (
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
                    <p className="text-sm lg:text-xl font-bold">{item.name}</p>
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
              <Separator className="my-4 bg-gray-500" />
              <div className="w-full flex justify-between">
                <span className="uppercase font-bold text-lg">Total</span>
                <span className="text-lg">{totalPrice} €</span>
              </div>
            </div>
            <SheetFooter className="flex flex-col">
              <SheetClose asChild>
                <Button
                  className=" mt-8 w-1/2"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2
                        size={16}
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      <p className="ml-4">Paiement en cours...</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <p>Paiement</p>
                      <BsCreditCard className="ml-4 w-5 h-5 text-center" />
                    </div>
                  )}
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
