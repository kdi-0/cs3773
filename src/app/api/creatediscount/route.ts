import prisma from '@/src/app/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const { code, value } = body;

    if (!code || value === undefined) {
      return NextResponse.json(
        { message: 'Code or value missing' },
        { status: 400 }
      );
    }

    const discountCode = await prisma.discount.create({
      data: {
        DISCOUNT_CODE: code,
        DISCOUNT_VALUE: value,
      },
    });

    return NextResponse.json(discountCode);
  } catch (error) {
    console.error('Error creating discount code:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
