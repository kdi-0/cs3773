import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  
  // try {
  //   const user = await
  // }

  /*
  goals: check to see if the account already exists, 
  if not, then add the account data to the database,
  otherwise, output error message: Account already exists
  */

  
}
