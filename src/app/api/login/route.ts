import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/logger';
import prisma from '@/src/app/prismadb';

export async function POST(request: Request) {
  const logging = logger();
  logging.info(`POST /api/login`);

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        USER_EMAIL: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.USER_PASSWORD);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return new NextResponse('Login successful', { status: 200 });
  } catch (e) {
    logging.error(e);
    return new NextResponse('Login failed', { status: 401 });
  } finally {
    prisma.$disconnect();
  }
}
