import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';
import { User } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: number;
    role: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  type JWT = User;
}
