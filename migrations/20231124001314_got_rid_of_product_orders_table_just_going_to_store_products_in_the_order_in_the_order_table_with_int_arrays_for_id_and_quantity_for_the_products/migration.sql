/*
  Warnings:

  - You are about to drop the `Product_Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Customer_Name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Customer_PhoneNum` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product_Order" DROP CONSTRAINT "Product_Order_ORDER_ID_fkey";

-- DropForeignKey
ALTER TABLE "Product_Order" DROP CONSTRAINT "Product_Order_PRODUCT_ID_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "Customer_Name" TEXT NOT NULL,
ADD COLUMN     "Customer_PhoneNum" TEXT NOT NULL,
ADD COLUMN     "PRODUCT_ID" INTEGER[],
ADD COLUMN     "PRODUCT_QUANTITY" INTEGER[];

-- DropTable
DROP TABLE "Product_Order";
