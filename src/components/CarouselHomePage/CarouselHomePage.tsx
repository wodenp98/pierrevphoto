"use client";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type CarouselData = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function Carousel({ data }: { data: CarouselData[] }) {
  return (
    <div className="relative h-[calc(100vh-80px)]">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
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
                  className="object-cover object-center w-full h-full"
                  width={2000}
                  height={2000}
                  priority={true}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 w-full flex justify-center p-14 z-10">
        <Link href="/boutique">
          <Button className="uppercase text-xl py-2 px-4">Boutique</Button>
        </Link>
      </div>
    </div>
  );
}
