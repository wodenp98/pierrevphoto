"use client";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type PortfolioData = {
  id: number;
  name: string;
  imageUrl: string;
};

type PortfolioProps = {
  data: PortfolioData[];
};

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group">
          <div className="relative overflow-hidden h-full cursor-pointer">
            <Image
              src="/assets/Nature.jpg"
              alt="Photo de pierre"
              height={300}
              width={300}
              className="rounded-md col-span-1 w-full h-full  object-cover"
            />
            <div className="rounded-md absolute h-full w-full bg-black/50 flex items-center justify-center group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold text-xl py-2 px-5 sm:text-2xl md:text-3xl lg:text-4xl">
                Portfolio
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] sm:max-h-[700px] p-0  bg-transparent border-none shadow-none">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={800}
                width={800}
                className="rounded-md  w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}