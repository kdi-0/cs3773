import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function GET(request) {
  try {
    const orders = await prisma.order.findMany();
    
    return NextResponse.json({ data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.error();
  }
}
