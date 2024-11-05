/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "building_type" TEXT,
ADD COLUMN     "delivery_instructions" TEXT,
ALTER COLUMN "country" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");
