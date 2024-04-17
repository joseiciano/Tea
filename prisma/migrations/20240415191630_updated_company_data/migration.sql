/*
  Warnings:

  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `fivestarRating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_created` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailed` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gotTheJob` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsiveness` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_companyName_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId",
DROP COLUMN "companyName",
DROP COLUMN "description",
DROP COLUMN "fivestarRating",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "detailed" TEXT NOT NULL,
ADD COLUMN     "difficulty" INTEGER NOT NULL,
ADD COLUMN     "gotTheJob" BOOLEAN NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "responsiveness" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";
