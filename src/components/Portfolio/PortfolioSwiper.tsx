"use client";
import { Pagination, Navigation } from "swiper/modules";
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
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop={true}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
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
      <div className="swiper-button-next" id="test"></div>
      <div className="swiper-button-prev" id="test"></div>
    </Swiper>
  );
}
