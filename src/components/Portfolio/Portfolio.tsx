import Loading from "@/app/loading";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import Image from "next/image";
import PortfolioSwiper from "./PortfolioSwiper";
import { z } from "zod";

const PortfolioSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    imageUrl: z.string(),
  })
);

async function getPortfolioImages() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/portfolio`, {
      method: "GET",
      credentials: "same-origin",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = PortfolioSchema.safeParse(await res.json());

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function Portfolio() {
  const portfolioImages = await getPortfolioImages();

  if (!portfolioImages) {
    return Loading();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group mt-6 h-96 w-3/5">
          <div className="relative overflow-hidden h-full cursor-pointer">
            <Image
              src="/assets/Nature.jpg"
              alt="Photo de pierre"
              height={720}
              width={1080}
              className="rounded-md col-span-1 w-full h-full  object-cover"
            />
            <div className="rounded-md absolute h-full w-full bg-black/50 flex items-center justify-center group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold text-xl py-2 px-5 sm:text-2xl md:text-3xl lg:text-4xl">
                Portfolio
              </p>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xs sm:max-w-screen-sm lg:max-w-screen-md  p-0 bg-transparent">
        <PortfolioSwiper data={portfolioImages} />
      </DialogContent>
    </Dialog>
  );
}
