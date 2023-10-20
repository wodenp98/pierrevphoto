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
          <CardContent className="h-96 w-full flex flex-col items-center">
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
        </Card>
      </section>
    </main>
  );
}
