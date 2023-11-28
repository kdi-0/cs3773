import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function GET() {
  try {
    // Fetch all products
    const products = await prisma.product.findMany();

    console.log("products:", products);

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error();
  }
}