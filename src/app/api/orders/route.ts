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

export async function PUT(request) {
  try {
    const { ORDER_ID /* other fields you want to update */ } =
      await request.json();

    // Validate order ID
    if (!ORDER_ID) {
      console.error('Order ID is missing.');
    }

    // Use Prisma to update the order with the specified orderId
    const updatedOrder = await prisma.order.update({
      where: { ORDER_ID: ORDER_ID },
      data: {
        // Update other fields as needed
      },
    });

    return NextResponse.json({ data: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.error();
  }
}

// DELETE route to delete orders
export async function DELETE(request) {
  try {
    const { ORDER_ID } = await request.json();

    // Validate order ID
    if (!ORDER_ID) {
      console.error('Order ID is missing.');
    }

    // Use Prisma to delete the order with the specified orderId
    await prisma.order.delete({
      where: { ORDER_ID: ORDER_ID },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.error();
  }
}
