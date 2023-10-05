import prisma from "../../../../prisma/client";
import { ArticlesSchema } from "../boutique.query";

export const getArticleById = async (articleId: number) => {
  const articleById = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });
  const validateArticles = ArticlesSchema.array().safeParse(articleById);
  if (!validateArticles.success) {
    throw new Error(validateArticles.error.message);
  }
  return validateArticles.data;
};
