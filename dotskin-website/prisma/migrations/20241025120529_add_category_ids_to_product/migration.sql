/*
  Warnings:

  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category_ids" TEXT[];

-- DropTable
DROP TABLE "ProductCategory";
