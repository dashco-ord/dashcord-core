import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "dashcord",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "Enter your Password",
        },
      },
      //@ts-ignore
      async authorize(credentials) {
        const user = await prisma.tnp.findUnique({
          where: { email: credentials?.email },
        });
        //@ts-ignore
        if (bcrypt.compareSync(credentials?.password, user?.passHash)) {
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
  },

  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
});
