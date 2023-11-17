/*
  Warnings:

  - Added the required column `ORDER_SHIPPING_ADDRESS` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ORDER_TOTAL_PRICE` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ORDER_SHIPPING_ADDRESS" TEXT NOT NULL,
ADD COLUMN     "ORDER_TOTAL_PRICE" DOUBLE PRECISION NOT NULL;
