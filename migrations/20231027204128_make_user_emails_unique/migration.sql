/*
  Warnings:

  - A unique constraint covering the columns `[USER_EMAIL]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_USER_EMAIL_key" ON "User"("USER_EMAIL");
