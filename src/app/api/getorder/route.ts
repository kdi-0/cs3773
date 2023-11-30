import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function GET(request) {
  try {
    const { userId } = request.query;

    if (!userId) {
      return NextResponse.error();
    }

    const userIdNumber = parseInt(userId, 10);

    // Fetch only the orders associated with the specific user
    const orders = await prisma.order.findFirst({
      where: {
        USER_ID: userIdNumber,
      },
    });

    console.log('orders:', orders);

    return NextResponse.json({ data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.error();
  }
}
