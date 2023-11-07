import { prisma } from "./prisma";
import { ArticlesSchema } from "./boutique.query";

export const getArticleById = async (articleId: string) => {
  const articleById = await prisma.article.findUnique({
    where: {
      id: Number(articleId),
    },
  });

  const validateArticles = ArticlesSchema.safeParse(articleById);

  if (!validateArticles.success) {
    throw new Error(validateArticles.error.message);
  }
  return validateArticles.data;
};
