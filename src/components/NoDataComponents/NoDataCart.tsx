/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { BsCartX, BsCreditCard } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "../ui/skeleton";

export default function NoDataCart() {
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
          <CardContent className="h-96 w-full">
            <div className="text-center">
              <BsCartX className="w-20 h-20 mx-auto " />
              <p className="my-8">
                Vous n'avez pas d'article dans votre panier
              </p>
            </div>
            <Link href="/boutique">
              <Button className="uppercase">Boutique</Button>
            </Link>
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
