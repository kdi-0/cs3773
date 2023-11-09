import prisma from "@/src/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const {
      name,
      description,
      category,
      images,
      price,
      quantity
    } = body;

    if (
      !name ||
      !description ||
      !category ||  // Add a validation check for category
      !images ||
      price === undefined ||
      quantity === undefined
    ) {
     
    }

    if (typeof category !== "number" || !Number.isInteger(category)) {
     
    }

    const product = await prisma.product.create({
      data: {
        PRODUCT_NAME: name,
        PRODUCT_DESCRIPTION: description,
        PRODUCT_PRICE: price,
        PRODUCT_IMAGE: images,
        PRODUCT_QUANTITY: quantity,
        PET_ID:1,
        PRODUCT_CATEGORY:1,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating the product', error);
    
  }
}