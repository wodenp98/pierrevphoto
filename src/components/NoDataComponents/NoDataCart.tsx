/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { BsCartX } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function NoDataCart() {
  return (
    <main className="flex flex-col h-[calc(70vh-80px)] items-center mt-4">
      <Card className="w-11/12 h-full">
        <CardHeader>
          <CardTitle>Mon Panier</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[350px] items-center justify-center">
          <div className="text-center">
            <BsCartX className="w-20 h-20 mx-auto " />
            <p className="my-8">Vous n'avez pas d'article dans votre panier</p>
          </div>
          <Link href="/boutique">
            <Button className="uppercase">Boutique</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
