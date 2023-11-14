import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from "../../prismadb"
import { logger } from "@/logger";

export async function POST(request: Request) {
  const logging = logger();
  logging.info(`POST /api/register`);
  
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
    return new NextResponse();
  } catch (e) {
    logging.error(e);
    return new NextResponse();
  } finally {
    prisma.$disconnect();
  }
}
