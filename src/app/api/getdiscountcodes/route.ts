
import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function GET(request) {
  try {
    const discountCodes = await prisma.discount.findMany();
    return NextResponse.json({ data: discountCodes });
  } catch (error) {
    console.error('Error fetching discount codes:', error);
    return NextResponse.error();
  }
}