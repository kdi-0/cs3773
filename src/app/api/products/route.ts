import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function GET() {
  try {
    // Fetch all products
    const products = await prisma.product.findMany();

    console.log('products:', products);

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error();
  }
}

export async function PUT(request) {
  try {
    const requestData = await request.json();
    console.log('Received data:', requestData);

    // Validate product ID
    const {
      PRODUCT_ID,
      PRODUCT_NAME,
      PRODUCT_CATEGORY,
      PRODUCT_QUANTITY,
      PRODUCT_PRICE,
      PRODUCT_DESCRIPTION,
      PRODUCT_IMAGE,
    } = requestData;
    if (!PRODUCT_ID) {
      console.error('Product ID is missing.');
      return NextResponse.error();
    }

    // Create an object with only the fields that are present in the payload
    const updateData = {
      ...(PRODUCT_NAME && { PRODUCT_NAME }),
      ...(PRODUCT_CATEGORY && { PRODUCT_CATEGORY }),
      ...(PRODUCT_QUANTITY && { PRODUCT_QUANTITY }),
      ...(PRODUCT_PRICE && { PRODUCT_PRICE }),
      ...(PRODUCT_DESCRIPTION && { PRODUCT_DESCRIPTION }),
      ...(PRODUCT_IMAGE && { PRODUCT_IMAGE }),
      // Add other fields as needed
    };

    const updatedProduct = await prisma.product.update({
      where: { PRODUCT_ID: PRODUCT_ID },
      data: updateData,
    });

    return NextResponse.json({ data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.error();
  }
}

// DELETE route to delete products
export async function DELETE(request) {
  try {
    const { PRODUCT_ID } = await request.json();

    // Validate product ID
    if (!PRODUCT_ID) {
      console.error('Product ID is missing.');
    }

    await prisma.product.delete({
      where: { PRODUCT_ID: PRODUCT_ID },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.error();
  }
}
