import Loading from "@/app/loading";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import Image from "next/image";
import PortfolioSwiper from "./PortfolioSwiper";

type PortfolioData = {
  id: number;
  name: string;
  imageUrl: string;
}[];

async function getPortfolioImages() {
  const res = await fetch(`${process.env.BASE_URL}/api/portfolio`);

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as PortfolioData;

  return data;
}

export default async function Portfolio() {
  const portfolioImages = await getPortfolioImages();

  if (!portfolioImages) {
    return Loading();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group mt-6 h-96 w-9/12">
          <div className="relative overflow-hidden h-full cursor-pointer">
            <Image
              src="/assets/Nature.jpg"
              alt="Photo de pierre"
              height={1080}
              width={1920}
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
      <DialogContent className="p-0 bg-transparent border-none shadow-none w-4/5 md:w-4/5 lg:w-2/3 xl:w-2/3 ">
        <PortfolioSwiper data={portfolioImages} />
      </DialogContent>
    </Dialog>
  );
}
