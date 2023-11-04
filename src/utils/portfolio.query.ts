import { z } from "zod";
import prisma from "../../prisma/client";

export const PortfolioImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
});

export type PortfolioImageSchema = z.infer<typeof PortfolioImageSchema>;

export const portfolioImages = async () => {
  const portfolio = await prisma.portfolio.findMany();

  const validatePortfolio = PortfolioImageSchema.array().safeParse(portfolio);

  if (!validatePortfolio.success) {
    throw new Error(validatePortfolio.error.message);
  }
  return validatePortfolio.data;
};
