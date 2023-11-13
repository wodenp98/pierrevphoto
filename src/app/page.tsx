import Carousel from "@/components/CarouselHomePage/CarouselHomePage";
import Link from "next/link";
import Portfolio from "@/components/Portfolio/Portfolio";
import { Button } from "@/components/ui/button";
import { carouselImages } from "@/utils/prisma/carousel.query";
import { portfolioImages } from "@/utils/prisma/portfolio.query";
import Loading from "./loading";
import type { Metadata } from "next";
import { getData } from "@/utils/helpers";

export const metadata: Metadata = {
  title: "Pierre.V | Accueil",
  description: "Bienvenue sur le site de Pierre V. Découvrez mon travail.",
};

async function getCarouselImages() {
  const res = await getData({ url: "http://localhost:3000/api/carousel" });
  console.log("res", res);
  return res;
}

export default async function Page() {
  // const carouselData = await carouselImages();
  const portfolioData = await portfolioImages();
  const data = await getCarouselImages();
  // console.log("data", data);

  // if (!carouselData || !portfolioData) {
  //   return Loading();
  // }

  return (
    <main>
      <Carousel data={data} />
      <section>
        <h1 className="flex items-center justify-center text-2xl pt-8">
          Bonjour, je suis Pierre Vigneron
        </h1>
        <h2 className="flex items-center justify-center text-gray-400 text-xl pt-4">
          Découvrez mon travail
        </h2>

        <div className="flex items-center flex-col h-5/6 ">
          <Portfolio data={portfolioData} />

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
