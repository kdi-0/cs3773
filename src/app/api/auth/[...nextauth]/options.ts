// import type { NextAuthOptions } from 'next-auth';
// import { CredentialsProvider } from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';
// import axios from 'axios';

// export const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'email',
//           type: 'text',
//           placeholder: 'your email',
//         },
//         password: {
//           label: 'password',
//           type: 'password',
//           placeholder: 'your password',
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials');
//         }

//         //prisma for now.
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user?.password) {
//           throw new Error('Invalid Credentials');
//         }

//         const isCorrectedPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isCorrectedPassword) {
//           throw new Error('Invalid Credentials');
//         }

//         return user;
//       },
//     }),
//   ],
//   pages:{
//     signIn:"/login",
//     error:"/login"
//   },
//   callbacks:{
//     session: async ({session, token, user} => {

//     })
//   }
// };
