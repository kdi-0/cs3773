import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  // These are only to show how prisma could be used here. only for local testing 
  // const deletedUser = await prisma.user.delete({
  //   where: {
  //     USER_ID: 3,
  //   },
  // });

  // fails if ran more than once since email is unique
  // const newUser = await prisma.user.create({
  //   data: {
  //     USER_NAME: 'Elliott',
  //     USER_EMAIL: 'xelliottx@example-user.com',
  //     USER_PASSWORD: 'password123',
  //   },
  // });
  const users = await prisma.user.findMany();
  return NextResponse.json({ data: users });
}
