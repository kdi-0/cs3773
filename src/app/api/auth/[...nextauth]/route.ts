import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '@/src/app/prismadb';
import NextAuth from 'next-auth';
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            USER_EMAIL: credentials.email,
          },
        });

        if (!user || !user?.USER_PASSWORD) {
          throw new Error('Invalid Credentials');
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.USER_PASSWORD
        );

        if (!isCorrectedPassword) {
          throw new Error('Invalid Credentials');
        }

        const authorizedUser = {
          email: user.USER_EMAIL,
          name: user.USER_NAME,
          id: user.USER_ID,
          role: user.ROLE,
        };
        return authorizedUser;
      },
    }),
  ],
  pages: {
    signIn: 'login',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.role = token.ROLE;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.ROLE = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
