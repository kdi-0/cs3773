-- CreateTable
CREATE TABLE "User" (
    "USER_ID" SERIAL NOT NULL,
    "USER_NAME" TEXT NOT NULL,
    "USER_EMAIL" TEXT NOT NULL,
    "USER_PASSWORD" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("USER_ID")
);

-- CreateTable
CREATE TABLE "Order" (
    "ORDER_ID" SERIAL NOT NULL,
    "USER_ID" INTEGER NOT NULL,
    "ORDER_DATE" TIMESTAMP(3) NOT NULL,
    "IS_CURRENT_ORDER" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ORDER_ID")
);

-- CreateTable
CREATE TABLE "Product_Order" (
    "PRODUCT_ORDER_ID" SERIAL NOT NULL,
    "ORDER_ID" INTEGER NOT NULL,
    "PRODUCT_ID" INTEGER NOT NULL,
    "ORDER_QUANTITY" INTEGER NOT NULL,

    CONSTRAINT "Product_Order_pkey" PRIMARY KEY ("PRODUCT_ORDER_ID")
);

-- CreateTable
CREATE TABLE "Product" (
    "PRODUCT_ID" SERIAL NOT NULL,
    "PRODUCT_NAME" TEXT NOT NULL,
    "PRODUCT_CATEGORY" INTEGER NOT NULL,
    "PET_ID" INTEGER NOT NULL,
    "PRODUCT_PRICE" DOUBLE PRECISION NOT NULL,
    "PRODUCT_QUANTITY" INTEGER NOT NULL,
    "PRODUCT_DESCRIPTION" TEXT,
    "PRODUCT_IMAGE" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("PRODUCT_ID")
);

-- CreateTable
CREATE TABLE "Category" (
    "CATEGORY_ID" SERIAL NOT NULL,
    "CATEGORY_NAME" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CATEGORY_ID")
);

-- CreateTable
CREATE TABLE "Pet" (
    "PET_ID" SERIAL NOT NULL,
    "PET_NAME" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("PET_ID")
);

-- CreateTable
CREATE TABLE "Discount" (
    "DISCOUNT_ID" SERIAL NOT NULL,
    "DISCOUNT_CODE" TEXT NOT NULL,
    "DISCOUNT_VALUE" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("DISCOUNT_ID")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "User"("USER_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Order" ADD CONSTRAINT "Product_Order_ORDER_ID_fkey" FOREIGN KEY ("ORDER_ID") REFERENCES "Order"("ORDER_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Order" ADD CONSTRAINT "Product_Order_PRODUCT_ID_fkey" FOREIGN KEY ("PRODUCT_ID") REFERENCES "Product"("PRODUCT_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_PRODUCT_CATEGORY_fkey" FOREIGN KEY ("PRODUCT_CATEGORY") REFERENCES "Category"("CATEGORY_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_PET_ID_fkey" FOREIGN KEY ("PET_ID") REFERENCES "Pet"("PET_ID") ON DELETE RESTRICT ON UPDATE CASCADE;