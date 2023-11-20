import Carousel from "@/components/CarouselHomePage/CarouselHomePage";
import Link from "next/link";
import Portfolio from "@/components/Portfolio/Portfolio";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre.V | Accueil",
  description: "Bienvenue sur le site de Pierre V. Découvrez mon travail.",
};

export default function Page() {
  return (
    <main>
      <Carousel />
      <section>
        <h1 className="flex items-center justify-center text-2xl pt-8">
          Bonjour, je suis Pierre Vigneron
        </h1>
        <h2 className="flex items-center justify-center font-bold text-xl pt-4">
          Découvrez mon travail
        </h2>

        <div className="flex items-center flex-col h-5/6 ">
          <Portfolio />

          <div className="w-full flex justify-center p-4 z-10">
            <Link href="/boutique">
              <Button className="uppercase py-2 px-4 text-xl">Voir plus</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
