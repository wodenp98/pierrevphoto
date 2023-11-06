import { z } from "zod";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";

export const CarouselImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
});

export type CarouselImageSchema = z.infer<typeof CarouselImageSchema>;

export const carouselImages = async () => {
  const carousel = await prisma.carousel.findMany();

  const validateCarousel = CarouselImageSchema.array().safeParse(carousel);

  if (!validateCarousel.success) {
    throw new Error(validateCarousel.error.message);
  }
  return validateCarousel.data;
};
