import Image from "next/image";
import prisma from "../../prisma/client";
import { z } from "zod";
import { NextApiResponse } from "next";
import Carousel from "@/components/CarouselHomePage/CarouselHomePage";
import Link from "next/link";
import Portfolio from "@/components/Portfolio/Portfolio";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { carouselImages } from "@/lib/carousel/carousel.query";
import { portfolioImages } from "@/lib/portfolio/portfolio.query";

export default async function Page() {
  const carouselData = await carouselImages();
  const portfolioData = await portfolioImages();

  if (!carouselData || !portfolioData) {
    notFound();
  }

  return (
    <main>
      <Carousel data={carouselData} />
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
