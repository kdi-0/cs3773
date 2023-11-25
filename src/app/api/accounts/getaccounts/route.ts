import { NextResponse } from 'next/server';
import prisma from '../../../prismadb';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error();
  }
}

export async function PUT(request) {
  try {
    const { USER_ID, USER_ROLE, USER_NAME, USER_EMAIL, USER_PASSWORD } = await request.json();

    // Validate user ID
    if (!USER_ID) {
      console.error('User ID is missing.');
    }

    // Use Prisma to update the user with the specified userId
    const updatedUser = await prisma.user.update({
      where: { USER_ID: USER_ID },
      data: {
        ROLE: USER_ROLE,
        USER_NAME,
        USER_EMAIL,
        USER_PASSWORD,
      } 
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.error();
  }
}