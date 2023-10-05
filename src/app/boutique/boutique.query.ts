import { z } from "zod";
import prisma from "../../../prisma/client";

export const ArticlesSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  price: z.number(),
});

export type ArticlesSchema = z.infer<typeof ArticlesSchema>;

export const getArticles = async () => {
  const articles = await prisma.article.findMany();

  const validateArticles = ArticlesSchema.array().safeParse(articles);

  if (!validateArticles.success) {
    throw new Error(validateArticles.error.message);
  }
  return validateArticles.data;
};
