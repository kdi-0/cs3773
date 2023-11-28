import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

export async function POST(request) {
  try {
    const { userId } = request.body;

    if (!userId || isNaN(userId)) {
      console.error('Invalid or missing userId parameter');
      return NextResponse.error();
    }

    const user = await prisma.user.findFirst({
      where: {
        USER_ID: parseInt(userId),
      },
    });

    if (!user) {
      console.error('User not found');
      return NextResponse.error();
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.error();
  }
}