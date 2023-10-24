import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BsCreditCard } from "react-icons/bs";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
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
