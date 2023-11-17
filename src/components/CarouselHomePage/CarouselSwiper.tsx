"use client";

import { Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

type CarouselData = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function CarouselSwiper({ data }: { data: CarouselData[] }) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop={true}
      className="h-full"
    >
      {data?.map((slide: CarouselData) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={slide.imageUrl}
                alt={slide.name}
                className="object-cover object-center overflow-hidden w-full h-full"
                width={1920}
                height={1080}
                priority={true}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-next" id="test"></div>
      <div className="swiper-button-prev" id="test"></div>
    </Swiper>
  );
}
