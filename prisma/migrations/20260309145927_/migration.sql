/*
  Warnings:

  - You are about to drop the column `author` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "author",
DROP COLUMN "read",
DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;
