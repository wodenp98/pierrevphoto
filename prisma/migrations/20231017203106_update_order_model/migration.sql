/*
  Warnings:

  - You are about to drop the `_ArticleToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToOrder" DROP CONSTRAINT "_ArticleToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToOrder" DROP CONSTRAINT "_ArticleToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "articleId" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "_ArticleToOrder";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
