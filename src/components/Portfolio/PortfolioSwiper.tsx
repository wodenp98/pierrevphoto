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

export default function PortfolioSwiper({ data }: { data: PortfolioData[] }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
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
            height={1080}
            width={1080}
            className="rounded-md  w-full h-full object-cover "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
