"use client";
import useFromStore from "@/lib/store/hooks/useFromStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import { useSession } from "next-auth/react";
import { useState } from "react";
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

import { usePathname } from "next/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!session?.user) {
      setIsLoading(false);

      if (pathname === "/connexion") {
        toast({
          variant: "destructive",
          className: "bg-red-500 text-white",
          title: "Connectez-vous pour passer commande.",
        });
        return;
      }
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
      const { sessionId }: { sessionId: string } = await postData({
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
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart size={36} strokeWidth={1.5} className="mr-1" />
          <span className="absolute top-1 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {cart ? cart.length : 0}
          </span>
        </Button>
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
            <div className="w-full">
              {cart?.map((item: CartItem) => (
                <div key={item.id} className="flex mt-5 w-full">
                  <Image
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.name}
                    width={360}
                    height={360}
                    className="object-cover h-24 w-24 sm:h-28 sm:w-28"
                  />

                  <div className="flex flex-col justify-between ml-2 grow sm:ml-4">
                    <p className="text-xs md:text-sm font-bold">{item.name}</p>
                    {/* <Accordion type="single" collapsible>
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
                    </Accordion>   */}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-xs mb-2 cursor-pointer hover:underline">
                            Détails
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {item.format} - {item.impression} - {item.rendu}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-col items-end justify-between ml-2 sm:ml-4">
                    <span className="text-sm flex pl-2 sm:pl-4">
                      {item.price}€
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item)}
                      className=" text-xs  hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={20} />
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

            <SheetFooter className="flex flex-col justify-center items-center sm:justify-center">
              <Button
                className=" mt-8 w-1/2"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Paiement...
                  </>
                ) : (
                  <>
                    <BsCreditCard className="mr-2 h-4 w-4" /> Paiement
                  </>
                )}
              </Button>
            </SheetFooter>
            <p className="text-center mt-2 text-sm">Prix HT</p>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
