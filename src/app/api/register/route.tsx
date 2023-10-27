import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from "@/logger";

export async function POST(request: Request) {
  const logging = logger();
  logging.info(`POST /api/register`);
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  try {
    const body = await request.json();
    const { name, email, password } = await body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(body);
    const user = await prisma.user.create({
      data: {
        USER_NAME: name,
        USER_EMAIL: email,
        USER_PASSWORD: hashedPassword
      }
    });
    console.log(`Created: ${user}`);
  } catch (e) {
    logging.error(e);
  } finally {
    return new NextResponse();
  }
}
