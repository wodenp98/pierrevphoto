import Link from "next/link";
import { Button } from "../ui/button";
import CarouselSwiper from "./CarouselSwiper";
import Loading from "@/app/loading";
import { z } from "zod";

type CarouselData = {
  carousel: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
};

const CarouselSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    imageUrl: z.string(),
  })
);

async function getCarouselImages() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/carousel`, {
      method: "GET",
      credentials: "same-origin",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = CarouselSchema.safeParse(await res.json());

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function Carousel() {
  const carouselImages = await getCarouselImages();

  if (!carouselImages) {
    return Loading();
  }

  return (
    <div className="relative h-[calc(100vh-80px)]">
      <CarouselSwiper data={carouselImages} />
      <div className="absolute bottom-0 left-0 w-full flex justify-center p-14 z-10">
        <Link href="/boutique">
          <Button className="uppercase text-xl py-2 px-4">Boutique</Button>
        </Link>
      </div>
    </div>
  );
}
